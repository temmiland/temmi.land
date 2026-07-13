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
import {
	colors, fonts, fluid, media, whiteAlpha
} from '@/styles';

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
		grid-column-gap: 3vw;
		grid-row-gap: 3vw;
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
		gap: 3vw;
		padding: 5vw 0;
		border: 0.25vw dashed ${whiteAlpha(0.3)};
		border-radius: 5vw;
		font-size: 4.5vw;
	}

	${media.tablet} {
		gap: 2vw;
		padding: 3vw 0;
		border: 0.125vw dashed ${whiteAlpha(0.3)};
		border-radius: 2.6vw;
		font-size: 2.6vw;
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

		${media.mobile} {
			font-size: 6vw;
		}

		${media.tablet} {
			font-size: 3.4vw;
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
}

export const BlogOverview = ({ posts }: BlogOverviewProps): JSX.Element => {

	const shownPosts = [...posts]
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, MAX_BLOG_CARDS);

	return (
		<BlogWrapper>
			{
				shownPosts.map((post) => (
					<BlogCard key={ post.id } post={ post } />
				))
			}
			<MoreLink href={ '/blog' }>
				<MoreCard>
					{ 'All articles' }
					<FontAwesomeIcon icon={ 'caret-right' } />
				</MoreCard>
			</MoreLink>
		</BlogWrapper>
	);
};
