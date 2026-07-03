/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../components/util/Typography';
import BlogCard from '../../components/blog/BlogCard';
import { blogPosts } from '../../../data/blog';

const BlogGridContainer = styled.div`
	padding: 0 6.5vw 3vw 6.5vw;
	max-width: 1545px;

	@media (min-width: 2000px) {
		min-width: 1600px;
	}
`;

const NoResults = styled.div`
	margin: 3vw 0;

	@media (min-width: 2000px) {
		margin: 40px 0;
	}
`;

const BlogCardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 1.6vw;
	grid-row-gap: 1.6vw;
	margin-top: 2vw;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 6vw;
		grid-row-gap: 6vw;
		margin-top: 7vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-column-gap: 3vw;
		grid-row-gap: 3vw;
		margin-top: 3vw;
	}

	@media (min-width: 2000px) {
		grid-column-gap: 32px;
		grid-row-gap: 32px;
		margin-top: 40px;
	}
`;

/**
 * Props for the blog grid.
 */
type BlogGridProps = {
	/** The search query to filter posts by, or '' for no filter. */
	searchQuery?: string
};

/**
 * BlogGrid component. Renders all blog posts (newest first) as a grid of
 * cards, optionally filtered by a search query matching the title, excerpt
 * or tags.
 * @param {BlogGridProps} props - The props for the BlogGrid component.
 * @returns {JSX.Element} BlogGrid JSX element.
 */
export const BlogGrid = ({ searchQuery = '' }: BlogGridProps): JSX.Element => {

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredPosts = [...blogPosts]
		.sort((a, b) => b.date.localeCompare(a.date))
		.filter(post =>
			!normalizedQuery
			|| post.title.toLowerCase().includes(normalizedQuery)
			|| post.excerpt.toLowerCase().includes(normalizedQuery)
			|| post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
		);

	if (filteredPosts.length === 0) {
		return (
			<BlogGridContainer>
				<NoResults>
					<Typography variant={ 'p' }>
						{ 'No blog posts found.' }
					</Typography>
				</NoResults>
			</BlogGridContainer>
		);
	}

	return (
		<BlogGridContainer>
			<BlogCardGrid>
				{ filteredPosts.map(post => (
					<BlogCard key={ post.id } post={ post } />
				)) }
			</BlogCardGrid>
		</BlogGridContainer>
	);
}
