/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../components/util/Typography';
import WBlogOverview from '../../widgets/BlogOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trail from '../../components/util/Trail';

const BlogContainer = styled.div`
	scroll-margin-top: var(--header-height);

	.blog-header {
		margin: 3.5vw 6.5vw;

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 10vw 6.5vw 0vw 6.5vw;
		}

		@media (min-width: 2000px) {
			margin: 70px 130px;
		}
	}

	#blog-list {
		margin: 5vw 11vw 2vw 11vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 0 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 12.5vw 4vw 0 4vw;
		}

		@media (min-width: 2000px) {
			margin: 100px 240px 40px 240px;
		}
	}
`;

export const Blog = () => (
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
				<WBlogOverview />
			</div>
		</Trail>
	</BlogContainer>
);
