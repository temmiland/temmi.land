/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Navigate, useParams } from 'react-router-dom';
import PBlogPost from '../components/pages/BlogPost';
import { blogPosts } from '../data/blog';

export default function BlogPost() {

	const { id } = useParams();

	if (id === undefined || !blogPosts
		.map(post => post.id)
		.includes(id))
		return <Navigate to={ '/blog' } replace />

	return (
		<PBlogPost postId={ id } />
	);
}
