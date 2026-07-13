/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogGrid from '@/features/blog/BlogGrid';
import { blogPosts } from '@/data/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@/ui/Typography';
import Header from '@/features/header/Header';
import Trail from '@/ui/Trail';
import PageLayout from '@/ui/PageLayout';
import SearchInput from '@/ui/SearchInput';
import { colors, media } from '@/styles';

const BlogSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: ${colors.surface};
	display: grid;

	${media.mobile} {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	${media.tablet} {
		padding: 15vw 0vw 65vw 0vw;
	}

	.blog-content {
		${media.wide} {
			margin: 0 auto;
		}
	}

	.blog-header {
		margin: 3.5vw 6.5vw;
	}
`;

const SearchRow = styled.div`
	padding: 0 6.5vw;
	margin: 1.5vw 0 0 0;

	${media.mobile} {
		margin: 4vw 0 0 0;
	}

	${media.tablet} {
		margin: 3vw 0 0 0;
	}
`;

export default function Blog() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');

	// Keep the ?search= query param in sync with the input so the URL stays
	// shareable and survives a reload. Replace (not push) so we don't add a
	// history entry per keystroke.
	useEffect(() => {
		setSearchParams((prev) => {
			const current = prev.get('search') ?? '';
			if (current === searchQuery) {
				return prev;
			}
			const next = new URLSearchParams(prev);
			if (searchQuery) {
				next.set('search', searchQuery);
			} else {
				next.delete('search');
			}
			return next;
		}, {
			replace: true
		});
	}, [searchQuery, setSearchParams]);

	return (
		<PageLayout header={ <Header animationDirection={ 'left' } /> }>
			<BlogSection>
				<div className={ 'blog-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<div className={ 'blog-header' }>
							<Typography variant={ 'h1' }>
								{ 'Blog' }
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'feather'] } />
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'wand-magic-sparkles'] }
								/>
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'pen-nib'] } />
							</Typography>
						</div>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<SearchRow>
							<SearchInput
								value={ searchQuery }
								onChange={ setSearchQuery }
								placeholder={ 'Search articles…' }
							/>
						</SearchRow>
						<BlogGrid posts={ blogPosts } searchQuery={ searchQuery } />
					</Trail>
				</div>
			</BlogSection>
		</PageLayout>
	);
}
