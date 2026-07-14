/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogCard from '@/features/blog/BlogCard';
import { Link } from '@/ui/Link/Link';
import { BlogPost } from '@/models/blogpost';
import { colors, fonts, fluid, media, whiteAlpha } from '@/styles';

const BlogWrapper = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: ${fluid(1.6)};
	grid-row-gap: ${fluid(1.6)};

	${media.mobile} {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 6vw;
		grid-row-gap: 6vw;
	}

	${media.tablet} {
		grid-column-gap: 2.25vw;
		grid-row-gap: 2.25vw;
	}
`;

/*
 * On desktop the more card sits beside the two latest articles as a tall
 * side column - matching the more-tile used in the Skills overview exactly,
 * so both "more" buttons read as one shared design. Below desktop there's
 * no room for a side column, so it falls back to the slim full-width row
 * (with a text label) that this page used everywhere before.
 */
const MoreLink = styled(Link)`
	display: block;
	position: absolute;
	grid-column: 3;
	top: 0;
	bottom: 0;
	left: ${fluid(1.6)};
	width: 38.2vw;

	${media.belowDesktop} {
		position: static;
		grid-column: 1 / -1;
		width: auto;
	}

	${media.wide} {
		left: 32px;
		width: 744px;
	}
`;

const MoreCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	padding-left: 1.5vw;
	border: 0.07vw dashed ${whiteAlpha(0.3)};
	border-radius: ${fluid(0.7)};
	color: ${colors.white};
	transition: 120ms ease;

	${media.belowDesktop} {
		justify-content: center;
		height: auto;
		gap: ${fluid(1)};
		padding: ${fluid(1.4)} 0;
		border-radius: ${fluid(1.1)};
		font-family: ${fonts.medium};
		font-size: ${fluid(1.1)};
	}

	${media.mobile} {
		gap: 3vw;
		padding: 5vw 0;
		border: 0.25vw dashed ${whiteAlpha(0.3)};
		border-radius: 5vw;
		font-size: 4.5vw;
	}

	${media.tablet} {
		gap: 1.5vw;
		padding: 2.25vw 0;
		border: 0.125vw dashed ${whiteAlpha(0.3)};
		border-radius: 1.95vw;
		font-size: 1.95vw;
	}

	${media.wide} {
		border-width: 1px;
		padding-left: 0;
	}

	&:hover {
		border-color: ${whiteAlpha(0.6)};
		background: ${whiteAlpha(0.05)};
	}

	.more-label {
		display: none;

		${media.belowDesktop} {
			display: inline;
		}
	}

	svg {
		color: ${colors.white};
		font-size: ${fluid(4.7)};

		${media.belowDesktop} {
			color: ${colors.accentBlue};
			font-size: ${fluid(1.4)};
		}

		${media.mobile} {
			font-size: 6vw;
		}

		${media.tablet} {
			font-size: 2.55vw;
		}

		${media.wide} {
			margin-left: 75px;
		}
	}
`;

const MAX_BLOG_CARDS = 2;

/**
 * BlogOverview component. Renders the latest blog posts as a compact grid of
 * cards plus a link to the full blog page.
 * @returns {JSX.Element} BlogOverview JSX element.
 */
/**
 * Props for the blog overview.
 */
type BlogOverviewProps = {
	/** The blog posts to pick the latest articles from. */
	posts: BlogPost[];
};

export const BlogOverview = ({ posts }: BlogOverviewProps): JSX.Element => {
	const shownPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_BLOG_CARDS);

	return (
		<BlogWrapper>
			{shownPosts.map((post) => (
				<BlogCard key={post.id} post={post} />
			))}
			<MoreLink href={'/blog'}>
				<MoreCard>
					<span className={'more-label'}>{'All articles'}</span>
					<FontAwesomeIcon icon={'caret-right'} />
				</MoreCard>
			</MoreLink>
		</BlogWrapper>
	);
};
