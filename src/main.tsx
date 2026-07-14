/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider, useLocation, useParams } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowDownWideShort,
	faArrowLeft,
	faArrowRight,
	faBars,
	faBolt,
	faBowlRice,
	faBox,
	faBoxesPacking,
	faBoxesStacked,
	faBoxOpen,
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
	faMugHot,
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
	faTruckRampBox,
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
import { PageLoader } from '@/ui/PageLoader';
import { projects } from './data/projects';
import { blogPosts } from './data/blog';
import './index.css';

const Home = lazy(() => import('@/pages/Home'));
const Imprint = lazy(() => import('@/pages/Imprint'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Project = lazy(() => import('@/pages/Project'));
const Skills = lazy(() => import('@/pages/Skills'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));

library.add(
	faArrowDownWideShort,
	faArrowLeft,
	faArrowRight,
	faBars,
	faBolt,
	faBowlRice,
	faBox,
	faBoxesPacking,
	faBoxesStacked,
	faBoxOpen,
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
	faMugHot,
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
	faTruckRampBox,
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

const SITE_URL = 'https://temmi.land';
// No og:image yet: /me.png is intentionally blocked in robots.txt (see S8),
// and social crawlers respect that, so it can't be reused as a preview
// image. Set this to a dedicated 1200x630 image once one exists.

/**
 * Validates the optional ':id' URL param and redirects to the projects
 * overview when no project with that id exists.
 */
const ProjectRoute = () => {
	const { id } = useParams();

	if (id !== undefined && !projects.some((project) => project.id === id))
		return <Navigate to={'/projects'} replace />;

	return <Project selectedProjectId={id} />;
};

/**
 * Redirects the old '/project' path (former canonical URL) to '/projects',
 * preserving the optional ':id'.
 *
 * TODO: remove once external links to /project have migrated to /projects.
 */
const LegacyProjectRedirect = () => {
	const { id } = useParams();
	return <Navigate to={id !== undefined ? `/projects/${id}` : '/projects'} replace />;
};

/**
 * Validates the ':id' URL param and redirects to the blog overview when no
 * post with that id exists.
 */
const BlogPostRoute = () => {
	const { id } = useParams();

	if (id === undefined || !blogPosts.some((post) => post.id === id))
		return <Navigate to={'/blog'} replace />;

	return <BlogPost postId={id} />;
};

type PageMetaProps = {
	/** Page title, rendered as "Temmi Pietsch - {title}". */
	title: string;
	/** Meta/OG description for this page. */
	description: string;
};

/**
 * Per-page title, description, Open Graph and canonical-url tags. Reads the
 * actual current path via useLocation() rather than the route's pattern, so
 * parameterized routes (e.g. /project/:id) get a canonical URL that reflects
 * the specific project or post being viewed, not the raw route pattern.
 * @param {PageMetaProps} props - The props for the PageMeta component.
 * @returns {JSX.Element} PageMeta JSX element.
 */
const PageMeta = ({ title, description }: PageMetaProps) => {
	const { pathname } = useLocation();
	const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
	const fullTitle = `Temmi Pietsch - ${title}`;

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name={'description'} content={description} />
			<meta property={'og:title'} content={fullTitle} />
			<meta property={'og:description'} content={description} />
			<meta property={'og:url'} content={url} />
			<link rel={'canonical'} href={url} />
		</Helmet>
	);
};

/**
 * Resets scroll to the top on every route change. React Router's built-in
 * <ScrollRestoration /> works on `window`, but this site scrolls the
 * `<body>` itself (see `html, body { overflow-y: auto }` in index.css), so
 * that component is a no-op here — this scrolls the element that actually
 * scrolls.
 */
const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		document.body.scrollTo(0, 0);
	}, [pathname]);
	return null;
};

/**
 * All pages of the site: URL pattern, document title, meta description and
 * page component.
 */
const pages = [
	{
		path: '/',
		title: 'Home',
		description:
			'Temmi Pietsch, Senior Software Developer based in Leipzig, Germany. ' +
			'Portfolio with projects, skills and a blog about mobile and web development.',
		element: <Home />
	},
	{
		path: '/projects/:id?',
		title: 'Projects',
		description:
			'A selection of apps, tools and libraries built by Temmi Pietsch, ' +
			'spanning React Native, React, Kotlin and Java.',
		element: <ProjectRoute />
	},
	{
		path: '/project/:id?',
		title: 'Projects',
		description:
			'A selection of apps, tools and libraries built by Temmi Pietsch, ' +
			'spanning React Native, React, Kotlin and Java.',
		element: <LegacyProjectRedirect />
	},
	{
		path: '/skills',
		title: 'Skills',
		description:
			'Technical skills, tools and experience of Temmi Pietsch, Senior ' +
			'Software Developer, across frontend, backend and mobile development.',
		element: <Skills />
	},
	{
		path: '/blog',
		title: 'Blog',
		description:
			'Articles by Temmi Pietsch about building and shipping software, ' +
			'from mobile apps to backend services.',
		element: <Blog />
	},
	{
		path: '/blog/:id',
		title: 'Blog',
		description:
			'Articles by Temmi Pietsch about building and shipping software, ' +
			'from mobile apps to backend services.',
		element: <BlogPostRoute />
	},
	{
		path: '/privacy',
		title: 'Privacy',
		description: 'Privacy policy for temmi.land, describing what data is collected and how it is used.',
		element: <Privacy />
	},
	{
		path: '/imprint',
		title: 'Imprint',
		description: 'Legal notice (Impressum) for temmi.land.',
		element: <Imprint />
	}
];

const router = createBrowserRouter([
	...pages.map(({ path, title, description, element }) => ({
		path,
		element: (
			<>
				<PageMeta title={title} description={description} />
				<ScrollToTop />
				<Suspense fallback={<PageLoader />}>{element}</Suspense>
			</>
		)
	})),
	{
		path: '*',
		element: <Navigate to={'/'} replace />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<Helmet>
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:site_name'} content={'Temmi Pietsch'} />
			</Helmet>
			<RouterProvider router={router} />
		</HelmetProvider>
	</React.StrictMode>
);
