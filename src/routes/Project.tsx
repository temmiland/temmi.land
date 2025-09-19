/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Navigate, useParams } from 'react-router-dom';
import PProject from '../components/pages/Project';
import { projects } from '../data/projects';

export default function Project() {

	const { id } = useParams();

	if(id !== undefined && !projects
		.map(project => project.id)
		.includes(id))
		return <Navigate to={ '/project' } replace />

	return (
		<PProject selectedProjectId={ id! }/>
	);
}
