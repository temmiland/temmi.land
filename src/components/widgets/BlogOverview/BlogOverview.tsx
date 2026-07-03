/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogCard from '../../components/blog/BlogCard';
import { Link } from '../../components/util/Link/Link';
import { blogPosts } from '../../../data/blog';

const BlogWrapper = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 1.6vw;
	grid-row-gap: 1.6vw;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 6vw;
		grid-row-gap: 6vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-column-gap: 3vw;
		grid-row-gap: 3vw;
	}

	@media (min-width: 2000px) {
		grid-column-gap: 32px;
		grid-row-gap: 32px;
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
	gap: 1vw;
	width: 100%;
	padding: 1.4vw 0;
	border: 0.07vw dashed rgba(255, 255, 255, 0.3);
	border-radius: 1.1vw;
	color: #ffffff;
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 1.1vw;
	transition: 120ms ease;

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 3vw;
		padding: 5vw 0;
		border: 0.25vw dashed rgba(255, 255, 255, 0.3);
		border-radius: 5vw;
		font-size: 4.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 2vw;
		padding: 3vw 0;
		border: 0.125vw dashed rgba(255, 255, 255, 0.3);
		border-radius: 2.6vw;
		font-size: 2.6vw;
	}

	@media (min-width: 2000px) {
		gap: 20px;
		padding: 28px 0;
		border: 1px dashed rgba(255, 255, 255, 0.3);
		border-radius: 22px;
		font-size: 22px;
	}

	&:hover {
		border-color: rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.05);
	}

	svg {
		color: #80cee1;
		font-size: 1.4vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 3.4vw;
		}

		@media (min-width: 2000px) {
			font-size: 28px;
		}
	}
`;

const MAX_BLOG_CARDS = 2;

/**
 * BlogOverview component. Renders the latest blog posts as a compact grid of
 * cards plus a link to the full blog page.
 * @returns {JSX.Element} BlogOverview JSX element.
 */
export const BlogOverview = (): JSX.Element => {

	const shownPosts = [...blogPosts]
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
