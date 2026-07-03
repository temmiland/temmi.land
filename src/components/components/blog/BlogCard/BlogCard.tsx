/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { formatBlogDate, formatReadingTime } from '../../../../utils/blogFormat';

/**
 * Props for the container of a blog card.
 */
type BlogCardContainerProps = {
	/** The background gradient of the card header strip. */
	gradient: string;
};

const BlogCardContainer = styled.a<BlogCardContainerProps>`
	display: block;
	text-decoration: none;
	color: inherit;
	overflow: hidden;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.08) 0%,
		rgba(255, 255, 255, 0.03) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.1);
	border-radius: 1.1vw;
	backdrop-filter: blur(0.7vw);
	--webkit-backdrop-filter: blur(0.7vw);
	transition: 120ms ease;

	@media (min-width: 320px) and (max-width: 600px) {
		border: 0.25vw solid rgba(255, 255, 255, 0.1);
		border-radius: 5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		border: 0.125vw solid rgba(255, 255, 255, 0.1);
		border-radius: 2.6vw;
	}

	@media (min-width: 2000px) {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 22px;
	}

	&:hover {
		border-color: rgba(255, 255, 255, 0.28);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.13) 0%,
			rgba(255, 255, 255, 0.05) 100%
		);
		transform: translateY(-0.2vw);
	}

	.blog-card-banner {
		background: ${(props: BlogCardContainerProps) => props.gradient};
		display: flex;
		align-items: center;
		gap: 1vw;
		padding: 1.6vw 1.6vw;
		color: #ffffff;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 4vw;
			padding: 6vw 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 2vw;
			padding: 3vw 3vw;
		}

		@media (min-width: 2000px) {
			gap: 20px;
			padding: 32px 32px;
		}

		svg {
			font-size: 2.4vw;
			flex-shrink: 0;

			@media (min-width: 320px) and (max-width: 600px) {
				font-size: 9vw;
			}

			@media (min-width: 600px) and (max-width: 1024px) {
				font-size: 5vw;
			}

			@media (min-width: 2000px) {
				font-size: 48px;
			}
		}
	}

	.blog-card-body {
		padding: 1.2vw 1.6vw 1.6vw 1.6vw;

		@media (min-width: 320px) and (max-width: 600px) {
			padding: 4vw 6vw 6vw 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			padding: 2vw 3vw 3vw 3vw;
		}

		@media (min-width: 2000px) {
			padding: 24px 32px 32px 32px;
		}
	}

	.blog-card-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.9vw;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.85vw;
		color: rgba(255, 255, 255, 0.55);

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 3vw;
			font-size: 3.4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 1.6vw;
			font-size: 1.9vw;
		}

		@media (min-width: 2000px) {
			gap: 18px;
			font-size: 17px;
		}

		svg {
			margin-right: 0.35vw;

			@media (min-width: 320px) and (max-width: 600px) {
				margin-right: 1.4vw;
			}

			@media (min-width: 2000px) {
				margin-right: 7px;
			}
		}
	}

	.blog-card-title {
		margin: 0.6vw 0 0 0;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: #ffffff;
		font-size: 1.5vw;
		line-height: 1.25;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 2.5vw 0 0 0;
			font-size: 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 1.2vw 0 0 0;
			font-size: 3.2vw;
		}

		@media (min-width: 2000px) {
			margin: 12px 0 0 0;
			font-size: 30px;
		}
	}

	.blog-card-excerpt {
		margin: 0.6vw 0 0 0;
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: rgba(255, 255, 255, 0.7);
		font-size: 1vw;
		line-height: 1.5;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 2.5vw 0 0 0;
			font-size: 3.8vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 1.2vw 0 0 0;
			font-size: 2.2vw;
		}

		@media (min-width: 2000px) {
			margin: 12px 0 0 0;
			font-size: 20px;
		}
	}

	.blog-card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5vw;
		margin: 1vw 0 0 0;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 2vw;
			margin: 4vw 0 0 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 1vw;
			margin: 2vw 0 0 0;
		}

		@media (min-width: 2000px) {
			gap: 10px;
			margin: 20px 0 0 0;
		}
	}

	.blog-card-tag {
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.8vw;
		color: rgba(255, 255, 255, 0.75);
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1vw;
		padding: 0.25vw 0.7vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.2vw;
			border-radius: 4vw;
			padding: 1vw 2.6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 1.8vw;
			border-radius: 2vw;
			padding: 0.5vw 1.4vw;
		}

		@media (min-width: 2000px) {
			font-size: 16px;
			border-radius: 20px;
			padding: 5px 14px;
		}
	}

	.blog-card-more {
		display: inline-flex;
		align-items: center;
		gap: 0.45vw;
		margin: 1.2vw 0 0 0;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.9vw;
		color: #80cee1;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 1.8vw;
			margin: 4.5vw 0 0 0;
			font-size: 3.6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 1vw;
			margin: 2.2vw 0 0 0;
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			gap: 9px;
			margin: 24px 0 0 0;
			font-size: 18px;
		}
	}
`;

/**
 * Props for a blog card.
 */
type BlogCardProps = {
	/** The blog post to render. */
	post: BlogPost;
};

/**
 * BlogCard component. Renders a single blog post as a clickable card with a
 * gradient banner, meta line (date + reading time), title, excerpt and tags,
 * linking to the full article.
 * @param {BlogCardProps} props - The props for the BlogCard component.
 * @returns {JSX.Element} BlogCard JSX element.
 */
export const BlogCard = ({ post }: BlogCardProps): JSX.Element => (
	<BlogCardContainer href={ `/blog/${post.id}` } gradient={ post.tileGradient }>
		<div className={ 'blog-card-banner' }>
			<FontAwesomeIcon
				icon={ [(post.iconPrefix ?? 'fas') as IconPrefix, post.icon as IconName] }
			/>
		</div>
		<div className={ 'blog-card-body' }>
			<div className={ 'blog-card-meta' }>
				<span>
					<FontAwesomeIcon icon={ ['fas', 'calendar'] } />
					{ formatBlogDate(post.date) }
				</span>
				<span>
					<FontAwesomeIcon icon={ ['fas', 'clock'] } />
					{ formatReadingTime(post.readingMinutes) }
				</span>
			</div>
			<h2 className={ 'blog-card-title' }>{ post.title }</h2>
			<p className={ 'blog-card-excerpt' }>{ post.excerpt }</p>
			<div className={ 'blog-card-tags' }>
				{ post.tags.map((tag, i) => (
					<span key={ i } className={ 'blog-card-tag' }>{ tag }</span>
				)) }
			</div>
			<span className={ 'blog-card-more' }>
				{ 'Read article' }
				<FontAwesomeIcon icon={ ['fas', 'arrow-right'] } />
			</span>
		</div>
	</BlogCardContainer>
);
