/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '@/ui/Typography';
import BlogOverview from '@/features/blog/BlogOverview';
import { BlogPost } from '@/models/blogpost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trail from '@/ui/Trail';
import { media } from '@/styles';

const BlogContainer = styled.div`
	scroll-margin-top: var(--header-height);

	.blog-header {
		margin: 3.5vw 6.5vw;

		${media.tablet} {
			margin: 10vw 6.5vw 0vw 6.5vw;
		}

		${media.wide} {
			margin: 70px 130px;
		}
	}

	#blog-list {
		margin: 5vw 11vw 2vw 11vw;

		${media.mobile} {
			margin: 0 6vw;
		}

		${media.tablet} {
			margin: 12.5vw 4vw 0 4vw;
		}

		${media.wide} {
			margin: 100px 240px 40px 240px;
		}
	}
`;

/**
 * Props for the blog section.
 */
type BlogSectionProps = {
	/** The blog posts shown in the overview. */
	posts: BlogPost[];
}

export const BlogSection = ({ posts }: BlogSectionProps) => (
	<BlogContainer id={ 'blog' }>
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
			animationDirection={ 'right' }
			animationSpeed={ 50 }
		>
			<div id={ 'blog-list' }>
				<BlogOverview posts={ posts } />
			</div>
		</Trail>
	</BlogContainer>
);
