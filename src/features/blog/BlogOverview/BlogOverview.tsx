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
import { colors, fluid, fluidRange, fonts, media, whiteAlpha } from '@/styles';

const BlogWrapper = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: ${fluid(1.6)};
	grid-row-gap: ${fluid(1.6)};

	${media.mobile} {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: ${fluidRange(23.14, 25.71)};
		grid-row-gap: ${fluidRange(23.14, 25.71)};
	}

	${media.tablet} {
		grid-column-gap: ${fluidRange(23.14, 25.71)};
		grid-row-gap: ${fluidRange(23.14, 25.71)};
	}
`;

/*
 * The "more" card sits as a slim full-width row below the two latest
 * articles, spanning both columns - mirroring the dashed more-tile used in
 * the Skills and Projects overviews.
 */
const MoreLink = styled(Link)`
	display: block;
	grid-column: 1 / -1;
`;

const MoreCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${fluid(1)};
	width: 100%;
	padding: ${fluid(1.4)} 0;
	border: 0.07vw dashed ${whiteAlpha(0.3)};
	border-radius: ${fluid(1.1)};
	color: ${colors.white};
	font-family: ${fonts.medium};
	font-size: ${fluid(1.1)};
	transition: 120ms ease;

	${media.mobile} {
		gap: ${fluidRange(10.91, 18.81)};
		padding: ${fluidRange(18.63, 27.38)} 0;
		border: 0.25vw dashed ${whiteAlpha(0.3)};
		border-radius: ${fluidRange(19.16, 22.62)};
		font-size: ${fluidRange(16.9, 23.45)};
	}

	${media.tablet} {
		gap: ${fluidRange(10.91, 18.81)};
		padding: ${fluidRange(18.63, 27.38)} 0;
		border: 0.125vw dashed ${whiteAlpha(0.3)};
		border-radius: ${fluidRange(19.16, 22.62)};
		font-size: ${fluidRange(16.9, 23.45)};
	}

	${media.wide} {
		border-width: 1px;
	}

	&:hover {
		border-color: ${whiteAlpha(0.6)};
		background: ${whiteAlpha(0.05)};
	}

	svg {
		color: ${colors.accentBlue};
		font-size: ${fluid(1.4)};

		${media.belowDesktop} {
			font-size: ${fluidRange(22.62, 30.48)};
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
					{'All articles'}
					<FontAwesomeIcon icon={'caret-right'} />
				</MoreCard>
			</MoreLink>
		</BlogWrapper>
	);
};
