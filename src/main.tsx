/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
	useParams
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowDownWideShort,
	faArrowLeft,
	faArrowRight,
	faBolt,
	faBowlRice,
	faBriefcase,
	faBriefcaseMedical,
	faCalendar,
	faCamera,
	faCar,
	faCarSide,
	faCaretDown,
	faCaretRight,
	faCarrot,
	faClock,
	faClose,
	faCode,
	faComments,
	faDatabase,
	faDiagramProject,
	faDragon,
	faEnvelope,
	faFeather,
	faFileCode,
	faFileCsv,
	faFileExport,
	faFilter,
	faFingerprint,
	faFlag,
	faGamepad,
	faGaugeHigh,
	faGavel,
	faGlobe,
	faHardHat,
	faHeartPulse,
	faIndustry,
	faKey,
	faLaptopCode,
	faLeaf,
	faLocationDot,
	faLock,
	faMagnifyingGlass,
	faMap,
	faMountainCity,
	faNetworkWired,
	faPalette,
	faPenNib,
	faPenRuler,
	faProjectDiagram,
	faRobot,
	faScaleBalanced,
	faSearch,
	faSection,
	faSeedling,
	faShieldHalved,
	faSitemap,
	faStar,
	faTabletScreenButton,
	faTowerBroadcast,
	faUserAstronaut,
	faVialCircleCheck,
	faWandMagicSparkles,
	faWater,
	faWrench,
	faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
	faAndroid,
	faAngular,
	faApple,
	faBitbucket,
	faConfluence,
	faCss3Alt,
	faDocker,
	faGitAlt,
	faGithub,
	faGitlab,
	faHtml5,
	faJava,
	faJenkins,
	faJira,
	faJs,
	faLinkedin,
	faLinux,
	faNodeJs,
	faPhp,
	faPython,
	faReact,
	faSwift,
	faVaadin,
	faVuejs,
	faWindows,
	faWordpress
} from '@fortawesome/free-brands-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '@/pages/Home';
import Imprint from '@/pages/Imprint';
import Privacy from '@/pages/Privacy';
import Project from '@/pages/Project';
import Skills from '@/pages/Skills';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import { projects } from './data/projects';
import { blogPosts } from './data/blog';
import './index.css';

library.add(
	faArrowDownWideShort,
	faArrowLeft,
	faArrowRight,
	faBolt,
	faBowlRice,
	faBriefcase,
	faBriefcaseMedical,
	faCalendar,
	faCamera,
	faCar,
	faCarSide,
	faCaretDown,
	faCaretRight,
	faCarrot,
	faClock,
	faClose,
	faCode,
	faComments,
	faDatabase,
	faDiagramProject,
	faDragon,
	faEnvelope,
	faFeather,
	faFileCode,
	faFileCsv,
	faFileExport,
	faFilter,
	faFingerprint,
	faFlag,
	faGamepad,
	faGaugeHigh,
	faGavel,
	faGlobe,
	faHardHat,
	faHeartPulse,
	faIndustry,
	faKey,
	faLaptopCode,
	faLeaf,
	faLocationDot,
	faLock,
	faMagnifyingGlass,
	faMap,
	faMountainCity,
	faNetworkWired,
	faPalette,
	faPenNib,
	faPenRuler,
	faProjectDiagram,
	faRobot,
	faScaleBalanced,
	faSearch,
	faSection,
	faSeedling,
	faShieldHalved,
	faSitemap,
	faStar,
	faTabletScreenButton,
	faTowerBroadcast,
	faUserAstronaut,
	faVialCircleCheck,
	faWandMagicSparkles,
	faWater,
	faWrench,
	faXmark,
	faAndroid,
	faAngular,
	faApple,
	faBitbucket,
	faConfluence,
	faCss3Alt,
	faDocker,
	faGitAlt,
	faGithub,
	faGitlab,
	faHtml5,
	faJava,
	faJenkins,
	faJira,
	faJs,
	faLinkedin,
	faLinux,
	faNodeJs,
	faPhp,
	faPython,
	faReact,
	faSwift,
	faVaadin,
	faVuejs,
	faWindows,
	faWordpress
);

/**
 * Validates the optional ':id' URL param and redirects to the projects
 * overview when no project with that id exists.
 */
const ProjectRoute = () => {

	const { id } = useParams();

	if (id !== undefined && !projects.some((project) => project.id === id))
		return <Navigate to={ '/project' } replace />;

	return <Project selectedProjectId={ id } />;
};

/**
 * Validates the ':id' URL param and redirects to the blog overview when no
 * post with that id exists.
 */
const BlogPostRoute = () => {

	const { id } = useParams();

	if (id === undefined || !blogPosts.some((post) => post.id === id))
		return <Navigate to={ '/blog' } replace />;

	return <BlogPost postId={ id } />;
};

/**
 * All pages of the site: URL pattern, document title and page component.
 */
const pages = [
	{
		path: '/', title: 'Home', element: <Home />
	},
	{
		path: '/project/:id?', title: 'Projects', element: <ProjectRoute />
	},
	{
		path: '/skills', title: 'Skills', element: <Skills />
	},
	{
		path: '/blog', title: 'Blog', element: <Blog />
	},
	{
		path: '/blog/:id', title: 'Blog', element: <BlogPostRoute />
	},
	{
		path: '/privacy', title: 'Privacy', element: <Privacy />
	},
	{
		path: '/imprint', title: 'Imprint', element: <Imprint />
	}
];

const router = createBrowserRouter([
	...pages.map(({ path, title, element }) => ({
		path,
		element: (
			<>
				<Helmet>
					<title>{ `Temmi Pietsch - ${title}` }</title>
				</Helmet>
				{ element }
			</>
		)
	})),
	{
		path: '*',
		element: <Navigate to={ '/' } replace />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<RouterProvider router={ router } />
		</HelmetProvider>
	</React.StrictMode>
);
