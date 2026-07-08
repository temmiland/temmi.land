/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import Trail from '../../components/util/Trail';
import { blogPosts } from '../../../data/blog';
import { projects } from '../../../data/projects';
import { formatBlogDate, formatReadingTime } from '../../../utils/blogFormat';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const BlogSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: #141414;
	display: grid;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 15vw 0vw 65vw 0vw;
	}

	.blog-content {
		width: 100%;
		max-width: 60vw;
		margin: 0 auto;

		@media (min-width: 320px) and (max-width: 600px) {
			max-width: 100%;
			padding: 0 6.5vw;
			box-sizing: border-box;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			max-width: 100%;
			padding: 0 6.5vw;
			box-sizing: border-box;
		}

		@media (min-width: 2000px) {
			max-width: 1000px;
		}
	}
`;

const FooterSection = styled.section`
	padding: 2.4vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 12vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 5vw 0;
	}

	@media (min-width: 2000px) {
		padding: 48px 0;
	}
`;

const PageGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 400;
	bottom: 0;
	pointer-events: none;

	@media (min-width: 2000px) {
		background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 1) 250px,
				rgba(0, 0, 0, 0) 750px,
				rgba(0, 0, 0, 0) 2750px,
				rgba(0, 0, 0, 1) 3250px
			)
			no-repeat;
		background-attachment: fixed;
		background-size: 3500px 100%;
		background-position: center;
		min-height: 100%;
		min-width: 3250px;
		margin: 0;
	}
`;

const PageMountains = styled.div`
	position: relative;
	max-width: 3000px;
	height: 34vw;
	margin-left: auto;
	margin-right: auto;
	z-index: 300;
	background: url(/footer.svg);
	background-repeat: no-repeat;
	pointer-events: none;
	margin-top: -46.25vw;

	@media (min-width: 320px) and (max-width: 600px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -147.5vw;
		margin-right: -20vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -120vw;
		margin-right: -20vw;
	}

	@media (min-width: 2000px) {
		background-size: cover;
		height: 1000px;
		margin-top: -1230px;
		background-position: center;
	}
`;

const BackLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.5vw;
	margin: 3.5vw 0 0 0;
	text-decoration: none;
	color: rgba(255, 255, 255, 0.6);
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 0.95vw;
	transition: color 120ms ease;

	&:hover {
		color: #ffffff;
	}

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 2vw;
		margin: 10vw 0 0 0;
		font-size: 3.6vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1vw;
		margin: 10vw 0 0 0;
		font-size: 2.1vw;
	}

	@media (min-width: 2000px) {
		gap: 10px;
		margin: 70px 0 0 0;
		font-size: 19px;
	}
`;

type ArticleBannerProps = {
	gradient: string;
};

const ArticleBanner = styled.div<ArticleBannerProps>`
	background: ${(props: ArticleBannerProps) => props.gradient};
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 1.75vw;
	color: #ffffff;
	padding: 2.4vw;
	margin: 1.5vw 0 2vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		border-radius: 7.5vw;
		padding: 7vw;
		margin: 6vw 0 8vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		border-radius: 3.5vw;
		padding: 4vw;
		margin: 3vw 0 4vw 0;
	}

	@media (min-width: 2000px) {
		border-radius: 35px;
		padding: 48px;
		margin: 30px 0 40px 0;
	}

	.banner-icon {
		font-size: 3vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 11vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 6vw;
		}

		@media (min-width: 2000px) {
			font-size: 60px;
		}
	}

	.banner-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1vw;
		margin: 1.2vw 0 0 0;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.9vw;
		color: rgba(255, 255, 255, 0.8);

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 3.5vw;
			margin: 4vw 0 0 0;
			font-size: 3.6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 2vw;
			margin: 2vw 0 0 0;
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			gap: 20px;
			margin: 24px 0 0 0;
			font-size: 18px;
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

	.banner-title {
		margin: 0.8vw 0 0 0;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 2.4vw;
		line-height: 1.2;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 3vw 0 0 0;
			font-size: 8vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 1.5vw 0 0 0;
			font-size: 4.5vw;
		}

		@media (min-width: 2000px) {
			margin: 16px 0 0 0;
			font-size: 48px;
		}
	}

	.banner-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6vw;
		margin: 1.4vw 0 0 0;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 2.5vw;
			margin: 5vw 0 0 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 1.2vw;
			margin: 2.5vw 0 0 0;
		}

		@media (min-width: 2000px) {
			gap: 12px;
			margin: 28px 0 0 0;
		}
	}

	.banner-tag {
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.8vw;
		background: rgba(255, 255, 255, 0.18);
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
`;

const ArticleBody = styled.article`
	h2 {
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: #ffffff;
		font-size: 1.6vw;
		margin: 2.2vw 0 0.8vw 0;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 6vw;
			margin: 8vw 0 3vw 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 3.4vw;
			margin: 4vw 0 1.5vw 0;
		}

		@media (min-width: 2000px) {
			font-size: 32px;
			margin: 44px 0 16px 0;
		}
	}

	p {
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: rgba(255, 255, 255, 0.82);
		font-size: 1.15vw;
		line-height: 1.7;
		margin: 0 0 1vw 0;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 4.2vw;
			margin: 0 0 4vw 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2.5vw;
			margin: 0 0 2vw 0;
		}

		@media (min-width: 2000px) {
			font-size: 23px;
			margin: 0 0 20px 0;
		}
	}
`;

const ArticleImage = styled.figure`
	margin: 1.6vw 0 2vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 6vw 0 8vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		margin: 3vw 0 4vw 0;
	}

	@media (min-width: 2000px) {
		margin: 24px 0 40px 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 1.75vw;

		@media (min-width: 320px) and (max-width: 600px) {
			border-radius: 7.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			border-radius: 3.5vw;
		}

		@media (min-width: 2000px) {
			border-radius: 35px;
		}
	}

	figcaption {
		margin: 0.8vw 0 0 0;
		text-align: center;
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.9vw;
		line-height: 1.5;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 3vw 0 0 0;
			font-size: 3.4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 1.5vw 0 0 0;
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			margin: 12px 0 0 0;
			font-size: 16px;
		}
	}
`;

const ImageGallery = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1vw;
	margin: 1.6vw 0 2vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 3vw;
		margin: 6vw 0 8vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 2vw;
		margin: 3vw 0 4vw 0;
	}

	@media (min-width: 2000px) {
		gap: 16px;
		margin: 24px 0 40px 0;
	}

	figure {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 0.9vw;

		@media (min-width: 320px) and (max-width: 600px) {
			border-radius: 3.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			border-radius: 1.8vw;
		}

		@media (min-width: 2000px) {
			border-radius: 18px;
		}
	}

	figcaption {
		margin: 0.8vw 0 0 0;
		text-align: center;
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.9vw;
		line-height: 1.5;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 3vw 0 0 0;
			font-size: 3.4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 1.5vw 0 0 0;
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			margin: 12px 0 0 0;
			font-size: 16px;
		}
	}
`;

const CtaButton = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.6vw;
	margin: 0.8vw 0 1.6vw 0;
	text-decoration: none;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.72) 100%
	);
	color: #141414;
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 1.05vw;
	border-radius: 2vw;
	padding: 0.8vw 1.6vw;
	transition: transform 120ms ease, background 120ms ease;

	&:hover {
		transform: translateY(-0.15vw);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.85) 100%
		);
	}

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 2.5vw;
		margin: 3vw 0 6vw 0;
		font-size: 4vw;
		border-radius: 8vw;
		padding: 3vw 6vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1.2vw;
		margin: 2vw 0 3vw 0;
		font-size: 2.3vw;
		border-radius: 4vw;
		padding: 1.6vw 3vw;
	}

	@media (min-width: 2000px) {
		gap: 12px;
		margin: 16px 0 32px 0;
		font-size: 21px;
		border-radius: 40px;
		padding: 16px 32px;
	}
`;

const StoreBadgeLink = styled.a`
	display: inline-block;
	margin: 0.8vw 0 1.6vw 0;

	img {
		display: block;
		height: 4.8vw;
		width: auto;
	}

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 3vw 0 6vw 0;

		img {
			height: 16.5vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		margin: 2vw 0 3vw 0;

		img {
			height: 9.75vw;
		}
	}

	@media (min-width: 2000px) {
		margin: 16px 0 32px 0;

		img {
			height: 96px;
		}
	}
`;

const RelatedProject = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.6vw;
	margin: 2.4vw 0 0 0;
	text-decoration: none;
	color: #80cee1;
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 1.05vw;
	transition: color 120ms ease;

	&:hover {
		color: #ffffff;
	}

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 2.5vw;
		margin: 8vw 0 0 0;
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1.2vw;
		margin: 4vw 0 0 0;
		font-size: 2.3vw;
	}

	@media (min-width: 2000px) {
		gap: 12px;
		margin: 48px 0 0 0;
		font-size: 21px;
	}
`;

/**
 * Props for the blog post page.
 */
type PBlogPostProps = {
	/** The id (slug) of the post to render. */
	postId: string
};

type StoreBadgeName = Extract<BlogBlock, { type: 'store-badge' }>['store'];

const storeBadges: Record<StoreBadgeName, { src: string, alt: string }> = {
	'google-play': {
		src: '/blog/badges/google-play-badge.png',
		alt: 'Get it on Google Play'
	},
	'app-store': {
		src: '/blog/badges/app-store-badge.svg',
		alt: 'Download on the App Store'
	}
};

/**
 * Renders a single content block of an article (heading, paragraph or
 * call-to-action button).
 * @param {BlogBlock} block - The block to render.
 * @param {number} index - The block's index within the article.
 * @returns {JSX.Element} The rendered block.
 */
const renderBlock = (block: BlogBlock, index: number): JSX.Element => {
	switch (block.type) {
	case 'heading':
		return <h2 key={ index }>{ block.text }</h2>;
	case 'image':
		return (
			<ArticleImage key={ index }>
				<img src={ block.src } alt={ block.alt } />
				{ block.caption ? <figcaption>{ block.caption }</figcaption> : null }
			</ArticleImage>
		);
	case 'gallery':
		return (
			<ImageGallery key={ index }>
				{ block.images.map((image, i) => (
					<figure key={ i }>
						<img src={ image.src } alt={ image.alt } />
						{ image.caption ? <figcaption>{ image.caption }</figcaption> : null }
					</figure>
				)) }
			</ImageGallery>
		);
	case 'cta':
		return (
			<CtaButton
				key={ index }
				href={ block.href }
				target={ '_blank' }
				rel={ 'noopener noreferrer' }
			>
				{ block.icon ? (
					<FontAwesomeIcon
						icon={ [
							(block.iconPrefix ?? 'fas') as IconPrefix,
							block.icon as IconName
						] }
					/>
				) : null }
				{ block.text }
			</CtaButton>
		);
	case 'store-badge': {
		const badge = storeBadges[block.store];
		return (
			<StoreBadgeLink
				key={ index }
				href={ block.href }
				target={ '_blank' }
				rel={ 'noopener noreferrer' }
			>
				<img src={ badge.src } alt={ badge.alt } />
			</StoreBadgeLink>
		);
	}
	default:
		return <p key={ index }>{ block.text }</p>;
	}
};

export default function BlogPost({ postId }: PBlogPostProps) {

	const post = blogPosts.find((entry) => entry.id === postId)!;
	const relatedProject = post.projectId
		? projects.find((project) => project.id === post.projectId)
		: undefined;

	return (
		<>
			<HeaderSection>
				<Header animationDirection={ 'left' } />
			</HeaderSection>
			<BlogSection>
				<div className={ 'blog-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<BackLink href={ '/blog' }>
							<FontAwesomeIcon icon={ ['fas', 'arrow-left'] } />
							{ 'Back to blog' }
						</BackLink>
						<ArticleBanner gradient={ post.tileGradient }>
							<FontAwesomeIcon
								className={ 'banner-icon' }
								icon={ [
									(post.iconPrefix ?? 'fas') as IconPrefix,
									post.icon as IconName
								] }
							/>
							<h1 className={ 'banner-title' }>{ post.title }</h1>
							<div className={ 'banner-meta' }>
								<span>
									<FontAwesomeIcon icon={ ['fas', 'calendar'] } />
									{ formatBlogDate(post.date) }
								</span>
								<span>
									<FontAwesomeIcon icon={ ['fas', 'clock'] } />
									{ formatReadingTime(post.readingMinutes) }
								</span>
							</div>
							<div className={ 'banner-tags' }>
								{ post.tags.map((tag, i) => (
									<span key={ i } className={ 'banner-tag' }>{ tag }</span>
								)) }
							</div>
						</ArticleBanner>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<ArticleBody>
							{ post.content.map((block, i) => renderBlock(block, i)) }
						</ArticleBody>
						{ relatedProject ? (
							<RelatedProject href={ relatedProject.href }>
								<FontAwesomeIcon icon={ ['fas', 'diagram-project'] } />
								{ `See the ${relatedProject.name} project` }
							</RelatedProject>
						) : null }
					</Trail>
				</div>
			</BlogSection>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
