/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './routes/Home';
import Imprint from './routes/Imprint';
import Privacy from './routes/Privacy';
import Project from './routes/Project';
import './index.css';


const App = () => {

	library.add(fas, fab, far);

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<>
					<Helmet>
						<title>{ 'Temmi Pietsch - Home' }</title>
					</Helmet>
					<Home />
				</>
			)

		},
		{
			path: '/project/:id?',
			element: (
				<>
					<Helmet>
						<title>{ 'Temmi Pietsch - Projects' }</title>
					</Helmet>
					<Project />
				</>
			)
		},
		{
			path: '/privacy',
			element: (
				<>
					<Helmet>
						<title>{ 'Temmi Pietsch - Privacy' }</title>
					</Helmet>
					<Privacy />
				</>
			)
		},
		{
			path: '/imprint',
			element: (
				<>
					<Helmet>
						<title>{ 'Temmi Pietsch - Imprint' }</title>
					</Helmet>
					<Imprint />
				</>
			)
		},
		{
			path: '*',
			element: <Navigate to={ '/' } replace />
		}
	]);

	return (
		<React.StrictMode>
			<HelmetProvider>
				<RouterProvider router={ router } />
			</HelmetProvider>
		</React.StrictMode>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
