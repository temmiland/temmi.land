/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Project } from '@/models/project';
import { ProjectStatus } from '@/models/projectstatus';

export const projects: Project[] = [
	{
		id: 'healthtrack-x',
		name: 'Healthtrack-X',
		status: ProjectStatus.WORKING_ON,
		description:
			'Healthtrack-X is a project I worked for adesso, building a secure data' +
			' space for healthcare companies to exchange production, supply chain, and CO₂' +
			' footprint data.',
		longDescription:
			'The industrial healthcare sector is a highly innovative field, yet' +
			' digitalization across company boundaries is still underdeveloped, largely because of' +
			' missing data standards and limited interoperability.' +
			'\n\n' +
			'Healthtrack-X addresses this by developing a data space that enables participants to' +
			' exchange data with one another in a secure and trustworthy environment. The value of' +
			' such a data space is being validated through three use cases: digitalizing production' +
			' and supply chains, exchanging data to counter supply shortages, and standardized CO₂' +
			' footprint management.' +
			'\n\n' +
			'Working for adesso on this project, I took on several roles. As Scrum Master, I' +
			' introduced and guided Scrum methodology and team culture, led and trained the team,' +
			' and built efficient project structures around ticketing, process optimization, and' +
			' project architecture.' +
			'\n\n' +
			'As a developer, I worked on the end-to-end integration of LLMs into the software' +
			' development lifecycle, designing AI-assisted workflows for code generation, automated' +
			' ticket creation, intelligent debugging, and test automation, implemented with' +
			' Java/Spring on the backend and TypeScript/Angular on the frontend. My expertise in' +
			' prompt engineering and context orchestration helped optimize the quality,' +
			' consistency, and predictability of the AI outputs, and this coordinated use of AI' +
			' across the team helped the project reach its goal ahead of schedule.',
		href: '/projects/healthtrack-x',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(135deg, #082a2c 0%, #145f56 100%)',
		tileIcon: 'heart-pulse',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [
			{
				icon: 'globe',
				host: 'HealthTrack-X Webpage',
				href: 'https://www.healthtrack-x.de'
			}
		],
		techStack: [
			'Java',
			'Spring Boot',
			'Angular',
			'TypeScript',
			'JavaScript',
			'Docker',
			'Kubernetes',
			'Maven',
			'Git',
			'GitLab CI',
			'Cypress',
			'Jest',
			'Transloco',
			'Eclipse Dataspace Components',
			'REST',
			'SCSS / Sass / Less',
			'HTML',
			'CSS',
			'Keycloak',
			'PostgreSQL',
			'OpenAPI / Swagger',
			'OpenID Connect',
			'OAuth2',
			'Component-Based Development',
			'Jira',
			'Confluence',
			'Scrum',
			'Kanban',
			'Prompt Engineering',
			'Context Engineering',
			'ChatGPT (OpenAI)',
			'Claude Code (Anthropic)'
		],
		docs: []
	},
	{
		id: 'alimonia',
		name: 'alimonia',
		status: ProjectStatus.WORKING_ON,
		description:
			'alimonia is a local-first app for planning recipes, meal plans, and shopping' +
			' lists — no account needed, with optional sync for shared households.',
		longDescription:
			"Most recipe and meal-planning apps assume you're always online and want" +
			" you signed in before you've even seen a recipe. alimonia takes the opposite approach:" +
			" it's designed to be fully usable the moment you install it, without an account and" +
			' without an internet connection.' +
			'\n\n' +
			'Recipes can be created manually, imported from a URL, or shared in directly from other' +
			" apps through iOS and Android's native share sheet, with photo-based text recognition" +
			' pulling out ingredients and steps automatically. Users plan their recipes onto specific' +
			' days in a weekly plan, and alimonia automatically compiles a shopping list from' +
			" everything that's scheduled." +
			'\n\n' +
			"As a developer, I'm building alimonia local-first: all data lives primarily in an" +
			' on-device SQLite database, with React Query handling caching and sync state on top in' +
			' a React Native/Expo app. Creating an account is entirely optional - it unlocks' +
			' cross-device sync and shared households, letting multiple people plan meals and shop' +
			" together without ever being required for the app's core functionality." +
			'\n\n' +
			"On the backend, I'm building a Kotlin/Spring Boot service on PostgreSQL that handles" +
			' authentication, storage, household and social features, and real-time updates over' +
			' WebSocket - keeping the account-based side of the app just as carefully engineered as' +
			' its offline-first core.',
		href: '/projects/alimonia',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(90deg, #0a2e1c 0%, #226b3e 100%)',
		tileIcon: 'bowl-rice',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [
			{
				icon: 'android',
				iconPrefix: 'fab',
				host: 'Google Play Store',
				href: 'https://play.google.com/store/apps/details?id=land.temmi.alimonia'
			},
			{
				icon: 'apple',
				iconPrefix: 'fab',
				host: 'App Store',
				href: 'https://apps.apple.com/app/alimonia/id6781319686'
			},
			{
				icon: 'github',
				iconPrefix: 'fab',
				host: 'GitHub (alimonia-expo)',
				href: 'https://github.com/temmiland/alimonia-expo'
			},
			{
				icon: 'github',
				iconPrefix: 'fab',
				host: 'GitHub (alimonia-expo-old)',
				href: 'https://github.com/temmiland/alimonia-expo-old'
			},
			{
				icon: 'github',
				iconPrefix: 'fab',
				host: 'GitHub (alimonia-ios)',
				href: 'https://github.com/temmiland/alimonia-ios'
			}
		],
		techStack: [
			'TypeScript',
			'React',
			'React Native',
			'Expo',
			'Bun',
			'i18next',
			'REST',
			'WebSocket',
			'JWT',
			'Kotlin',
			'Spring Boot',
			'Spring Security',
			'Gradle',
			'PostgreSQL',
			'Docker',
			'JUnit',
			'Component-Based Development',
			'Object-Oriented Programming'
		],
		docs: []
	},
	{
		id: 'pxworlds',
		name: 'pxWorlds',
		status: ProjectStatus.WORKING_ON,
		description: 'A game prototype written with Java and LWJGL.',
		longDescription:
			'This Java game prototype, developed using LWJGL (Lightweight Java Game' +
			' Library), was inspired by a detailed tutorial series. The project demonstrates the' +
			' practical application of LWJGL for creating interactive and engaging game' +
			' experiences, highlighting key concepts such as graphics rendering, input handling,' +
			" and game physics. Through this prototype, I've gained valuable insights into game" +
			' development and showcased my ability to implement complex features using Java and' +
			' LWJGL.',
		href: '/projects/pxworlds',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #150a2e 0%, #3d1266 45%, #0a2a66 100%)',
		tileIcon: 'gamepad',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/pxWorlds',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/pxWorlds?tab=MIT-1-ov-file#readme',
		links: [],
		techStack: ['Java', 'LWJGL 3', 'Maven', 'GitHub Actions'],
		docs: []
	},
	{
		id: 'rollercoaster',
		name: 'rollercoaster',
		status: ProjectStatus.WORKING_ON,
		description: 'Rollercoaster is a lightweight LWJGL foundation for 2d games.',
		longDescription:
			'Rollercoaster is a lightweight LWJGL foundation for graphical' +
			' applications — it handles configuration, GLFW/OpenGL windowing, input' +
			' and the main loop, so games and editors only need to implement their own' +
			' Game. Used as the base of pxWorlds.',
		href: '/projects/rollercoaster',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #2e0a12 0%, #8f1a4a 45%, #5b1a6f 100%)',
		tileIcon: 'gamepad',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/rollercoaster',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/rollercoaster?tab=MIT-1-ov-file#readme',
		links: [],
		techStack: ['Java', 'LWJGL 3', 'Maven', 'GitHub Actions'],
		docs: []
	},
	{
		id: 'expo-extra-app-icons',
		name: 'expo-extra-app-icons',
		status: ProjectStatus.DONE,
		description:
			'expo-extra-app-icons is a expo plugin that enables you to' +
			' programmatically change the app icons in an Expo app.',
		longDescription:
			'expo-extra-app-icons is a expo plugin that enables you to' +
			' programmatically change the app icons in an Expo app. This includes support for' +
			" Android's monochrome icon variant and iOS 18's dark and tinted icon styles," +
			' providing a flexible solution for dynamic icon customization across platforms.',
		href: '/projects/expo-extra-app-icons',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #084438 0%, #0c5c48 100%)',
		tileIcon: 'comments',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/expo-extra-app-icons',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/expo-extra-app-icons?tab=MIT-1-ov-file#readme',
		links: [],
		techStack: ['TypeScript', 'Kotlin', 'Swift', 'Expo', 'React Native'],
		docs: []
	},
	/*{
		id: 'vokse',
		name: 'Vokse',
		status: ProjectStatus.WORKING_ON,
		description: 'Vokse is an app concept where users can track the status of their plants,'
			+ ' such as watering schedules, fertilizer needs, and more.',
		longDescription: 'Vokse (/ˈʋɔksə/) is an app concept where users can track the status of'
			+ ' their plants, such as watering schedules, fertilizer needs, and more. The app will'
			+ ' provide notifications and allow users to document photos and details in a timeline'
			+ ' format for easy reference and sharing.',
		href: '/projects/vokse',
		tileGradient: 'linear-gradient(45deg, #0a2e1c 0%, #1a5c34 100%)',
		tileIcon: 'seedling',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [],
		techStack: [
			'typescript',
			'react-native',
			'expo',
			'react-redux',
			'styled-components',
			'i18njs',
			'moment',
			'axios',
			'nodejs',
			'npm'
		],
		docs: []
	},*/
	{
		id: 'gj-sharepic-creator',
		name: 'gj-sharepic-creator',
		status: ProjectStatus.DONE,
		description:
			'This project makes it easy to create Instagram share pics and stories in the' +
			' new corporate design of GRÜNE JUGEND.',
		longDescription:
			'As members of GRÜNE JUGEND Dresden, we regularly create content for' +
			" Instagram - stories and sharepics that need to follow the organization's 2024" +
			' corporate design. Doing that by hand in image editing software was tedious, and not' +
			' everyone on the team was comfortable with tools like Figma or Photoshop.' +
			'\n\n' +
			"To fix that, I set out to turn the corporate design's standard templates into an" +
			' interactive web application that lets any member create on-brand Instagram content' +
			' without touching an image editor. As a developer, I designed both the user interface' +
			' and the underlying software architecture, then built a prototype with React and' +
			' TypeScript to validate the approach with the team before iterating it into the full' +
			' application.' +
			'\n\n' +
			'On the backend, I used Supabase and PostgreSQL to store and manage templates and' +
			' assets, and Docker to containerize the app. Beyond the code, I set up and maintained' +
			" the CI/CD pipeline, as well as the project's domain, Cloudflare CDN, and server" +
			' hosting.',
		href: '/projects/gj-sharepic-creator',
		isVisibleOnHome: true,
		tileGradient:
			'linear-gradient(45deg, rgb(20, 45, 15), rgb(32, 24, 48),' + ' rgb(48, 22, 40), rgb(48, 20, 15))',
		tileIcon: 'camera',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/gj-sharepic-creator',
		license: 'AGPL License v3',
		licenseHref: 'https://github.com/temmiland/gj-sharepic-creator?tab=AGPL-3.0-1-ov-file',
		links: [
			{
				icon: 'globe',
				host: 'Webpage',
				href: 'https://gjsharepics.temmi.land'
			}
		],
		techStack: [
			'TypeScript',
			'React',
			'HTML',
			'CSS',
			'Component-Based Development',
			'UX Design',
			'System Integration',
			'Supabase',
			'PostgreSQL',
			'Docker',
			'Bun',
			'Vite',
			'Vitest',
			'React Testing Library',
			'GitHub Actions',
			'Nginx',
			'Traefik',
			'Git'
		],
		docs: []
	},
	{
		id: 'cariad-ppe-infotainment',
		name: 'CARIAD Infotainment',
		status: ProjectStatus.DONE,
		description:
			'CARIAD PPE Infotainment is a project I worked for Valtech Mobility,' +
			" developing modern infotainment apps for Audi and Porsche's new PPE platform.",
		longDescription:
			'The automotive industry is undergoing a major platform shift as' +
			' manufacturers consolidate previously separate vehicle lines onto shared,' +
			" software-defined platforms. Audi and Porsche's new PPE platform brings this shift to" +
			' their infotainment systems, moving to an Android Automotive-based operating system' +
			' that opens the door to richer, more flexible in-car experiences.' +
			'\n\n' +
			'Working for Valtech Mobility on behalf of CARIAD SE, I contributed to developing' +
			' modern infotainment apps for this new platform, bringing innovative features that' +
			' improve vehicle comfort and usability. As a developer, I focused on the agile' +
			' development of in-car applications, in particular calendar and email functionality,' +
			' built with Kotlin and the Android Automotive SDK.' +
			'\n\n' +
			'Key challenges included onboarding onto the Android Automotive SDK and Kotlin as new' +
			' technologies, coordinating with proprietary dependencies from third-party vendors' +
			' developing the app in parallel - which required continuous adjustments and' +
			" synchronization - and meeting the automotive industry's stringent quality and" +
			' security requirements under ASPICE.' +
			'\n\n' +
			'Beyond feature development, I set up a cloud machine for debugging on remote' +
			' emulators, maintained the demo device, and worked on accessible, barrier-free web' +
			' development.',
		href: '/projects/cariad-ppe-infotainment',
		tileGradient: 'linear-gradient(135deg, #0f1b2d 0%, #1f3a5f 100%)',
		tileIcon: 'car-side',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [
			{
				icon: 'globe',
				host: 'Valtech Mobility Newsroom',
				href: 'https://valtech-mobility.de/news/hybride-architektur-fuer-porsche-und-audi/'
			}
		],
		techStack: [
			'Scrum',
			'Docker',
			'Kubernetes',
			'Maven',
			'Android',
			'Kotlin',
			'Git',
			'Object-Oriented Programming',
			'SCSS / Sass / Less',
			'REST',
			'Jira',
			'Confluence',
			'Bitbucket',
			'Android Automotive SDK',
			'Android Studio',
			'Jetpack Compose',
			'Gradle',
			'JUnit'
		],
		docs: []
	},
	{
		id: 'audi-a3-e-drive-app',
		name: 'Audi A3 E-Drive App',
		status: ProjectStatus.DONE,
		isVisibleOnHome: true,
		description:
			'Audi A3 E-Drive App is a project I worked for Valtech Mobility, building an' +
			" in-car app that tracks and visualizes the electric driving share of Audi's hybrid" +
			' A3 models.',
		longDescription:
			'Hybrid vehicles increasingly need to make their electric usage tangible to' +
			' drivers - not just as a technical spec, but as an incentive to drive more' +
			" efficiently. Audi's hybrid A3 models needed exactly this kind of feedback loop," +
			" integrated directly into the vehicle's MIB3 infotainment platform." +
			'\n\n' +
			'Working for Valtech Mobility on behalf of Audi AG, I contributed to conceiving,' +
			' prototyping, and building an in-car app that reads driving data from the platform' +
			' backend, analyzes the share of electrically driven distance, and presents it to the' +
			' driver in an approachable interface. As a developer, I built the app with Angular and' +
			" TypeScript, working closely with Audi's UI/UX team from early concept through to a" +
			' production-ready prototype.' +
			'\n\n' +
			'Key challenges included integrating the new app into the existing MIB3 platform' +
			' without disrupting established workflows, and ensuring the underlying data processing' +
			' stayed accurate and performant across a wide range of driving scenarios.' +
			'\n\n' +
			"I was also responsible for the app's unit and integration test coverage, using Jest" +
			' and Cypress within an agile Scrum setup to keep quality high through frequent' +
			' iterations.',
		href: '/projects/audi-a3-e-drive-app',
		tileGradient: 'linear-gradient(135deg, #062a33 0%, #0e7490 100%)',
		tileIcon: 'bolt',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [],
		techStack: [
			'Angular',
			'Jira',
			'Confluence',
			'Scrum',
			'Docker',
			'Git',
			'JavaScript',
			'HTML',
			'CSS',
			'Karma / Jasmine',
			'SCSS / Sass / Less',
			'REST',
			'Jenkins',
			'UX Design',
			'TypeScript',
			'Component-Based Development',
			'Bitbucket',
			'RxJS',
			'Object-Oriented Programming',
			'SonarQube'
		],
		docs: []
	},
	{
		id: 'mib3-infotainment',
		name: 'MIB3 Infotainment Apps',
		status: ProjectStatus.DONE,
		description:
			'MIB3 Infotainment Apps is a project I worked for Valtech Mobility,' +
			" developing weather, news, and POI apps for VW Group's MIB2 and MIB3 platforms.",
		longDescription:
			"Infotainment systems are one of the most visible parts of a modern car's" +
			" software, and VW AG's MIB2 and MIB3 platforms needed a growing set of apps -" +
			' weather, news, points of interest - to keep that experience useful and relevant.' +
			" Extending them meant working across two very different technology generations: MIB2's" +
			" proprietary template engine and MIB3's shift to modern web technologies like Angular" +
			' and TypeScript.' +
			'\n\n' +
			'Working for Valtech Mobility on behalf of Audi AG, VW AG and Porsche AG, I contributed to' +
			' developing and integrating these infotainment apps. As a developer, I built MIB3 apps with' +
			" Angular and TypeScript, and MIB2 apps with JavaScript on top of VW's proprietary" +
			' template engine, while helping ensure consistent performance and stability across a' +
			' wide range of vehicle models.' +
			'\n\n' +
			'Beyond feature development, I was responsible for planning and accompanying the' +
			' rollout of these web-based apps onto vehicle models, and for running cooperative,' +
			' interactive workshops with the client to analyze requirements and work out solutions' +
			' together.' +
			'\n\n' +
			'I also worked with Karma and Jasmine for unit testing, and used' +
			' Jenkins pipelines to keep continuous integration and delivery reliable across' +
			' releases.',
		href: '/projects/mib3-infotainment',
		tileGradient: 'linear-gradient(135deg, #0a1f3d 0%, #1a56b0 100%)',
		tileIcon: 'tablet-screen-button',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [
			{
				icon: 'globe',
				host: '4screen x Audi Collaboration',
				href:
					'https://4screen.com/de/article/the-collaboration-between-4-screen-and-audi-yields' +
					'-enhanced-in-car-experience-for-drivers-in-germany/'
			}
		],
		techStack: [
			'Angular',
			'Jira',
			'Confluence',
			'Scrum',
			'Docker',
			'Git',
			'JavaScript',
			'HTML',
			'CSS',
			'Karma / Jasmine',
			'SCSS / Sass / Less',
			'REST',
			'Jenkins',
			'UX Design',
			'TypeScript',
			'Component-Based Development',
			'Bitbucket',
			'RxJS',
			'Object-Oriented Programming',
			'SonarQube'
		],
		docs: []
	},
	{
		id: 'hydrograv-lifecycle-platform',
		name: 'hydrograv LC Platform',
		status: ProjectStatus.DONE,
		description:
			'In this project, I worked for hydrograv, building a' +
			' microservice-based platform that gives wastewater treatment operators, engineers, and' +
			' other stakeholders a central, lifecycle-long view of their plants.',
		longDescription:
			'hydrograv specializes in CFD-based hydraulic optimization for water and' +
			' wastewater treatment plants across Europe, combining deep domain expertise in' +
			' wastewater engineering with software built specifically for the industry rather than' +
			' off-the-shelf tools.' +
			'\n\n' +
			'The goal of the Lifecycle Platform was to give plant operators, engineering firms,' +
			' construction companies, and maintenance staff continuous, centralized access to all' +
			' relevant information about their treatment plants, downstream basins, and related' +
			" assets - improving efficiency and transparency throughout a plant's entire lifecycle." +
			'\n\n' +
			"As a developer, I helped build the platform's backend as a set of microservices, and" +
			' set up and administered an OpenShift container platform to run and maintain it. I also' +
			' developed web applications for capturing and visualizing customer and plant data, and' +
			' built out the internal build and deployment pipelines using Docker and Jenkins.' +
			'\n\n' +
			"Beyond development, I administered and configured the team's Atlassian tooling (Jira" +
			' and Confluence) to support the wider development process.',
		href: '/projects/hydrograv-lifecycle-platform',
		tileGradient: 'linear-gradient(135deg, #1c2b2b 0%, #35504f 100%)',
		tileIcon: 'gauge-high',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		links: [
			{
				icon: 'globe',
				host: 'hydrograv Webpage',
				href: 'https://www.hydrograv.com/'
			}
		],
		techStack: [
			'Maven',
			'MongoDB',
			'Component-Based Development',
			'Docker',
			'Kubernetes',
			'OpenShift',
			'Jenkins',
			'CSS',
			'C#',
			'Kanban',
			'Keycloak',
			'Scrum',
			'Git',
			'MariaDB',
			'HTML',
			'Cypress',
			'Vaadin',
			'Apache OFBiz',
			'OpenStreetMap',
			'Leaflet',
			'OpenLayers',
			'Google Maps API',
			'GeoServer',
			'PostGIS',
			'Jira',
			'Confluence',
			'REST',
			'System Integration',
			'Object-Oriented Programming',
			'Java',
			'Spring Boot',
			'UX Design',
			'Network & Internet Technologies'
		],
		docs: []
	},
	{
		id: 'liquidium',
		name: 'liquidium',
		status: ProjectStatus.DONE,
		description:
			'liquidium is a wiki tool I built for hydrograv as my apprentice project, with' +
			' a JavaScript/ReactJS frontend and a Spring backend written in Java.',
		longDescription:
			'As part of my apprenticeship at hydrograv, I set out to build' +
			' "liquidium", a lightweight, collaborative wiki tool for internally documenting and' +
			' managing content, with a focus on a fast, responsive editing experience and reliable' +
			' data storage.' +
			'\n\n' +
			'As a developer, I designed and implemented the platform end to end: a' +
			' JavaScript/ReactJS frontend built around a rich-text editor, and a Spring Boot' +
			" backend written in Java that exposes the wiki's content over REST and persists it in" +
			' a Couchbase database.' +
			'\n\n' +
			'The project let me dig into the full stack of a real application, from' +
			' component-based frontend architecture and state management, to backend service' +
			' design, to setting up the CI/CD pipeline that built and deployed the tool with' +
			' Docker.',
		href: '/projects/liquidium',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #24384a 0%, #16232f 100%)',
		tileIcon: 'water',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/liquidium',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/liquidium?tab=MIT-1-ov-file#readme',
		links: [],
		techStack: [
			'Java',
			'Spring Boot',
			'JavaScript',
			'React',
			'Redux',
			'Maven',
			'Docker',
			'Kubernetes',
			'Git',
			'HTML',
			'CSS',
			'REST',
			'Jenkins',
			'Component-Based Development',
			'System Integration',
			'Node.js & NPM',
			'Couchbase',
			'Netflix Zuul',
			'Netflix Eureka',
			'Apache Kafka',
			'Apache OFBiz'
		],
		docs: []
	},
	{
		id: 'react-fileicons',
		name: 'react-fileicons',
		status: ProjectStatus.DONE,
		description: 'Simple and intuitive react component for visualizing file icons.',
		longDescription:
			'react-fileicons is a simple and intuitive React component for visualizing' +
			' file icons. The component allows users to easily integrate and customize file icons' +
			' by utilizing various color schemes and icon styles. With the ability to use custom' +
			' color configurations and adjust the size of icons variably, react-fileicons' +
			' provides a flexible solution for displaying file icons in React applications.',
		href: '/projects/react-fileicons',
		tileGradient: 'linear-gradient(45deg, #4a1f12 0%, #5c1428 100%)',
		tileIcon: 'file-code',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/react-fileicons',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/react-fileicons?tab=MIT-1-ov-file#readme',
		links: [
			{
				icon: 'globe',
				host: 'Demo (Storybook)',
				href: 'http://demo.temmi.land/react-fileicons/'
			}
		],
		techStack: ['JavaScript', 'React', 'styled-components', 'Storybook', 'Node.js & NPM'],
		docs: []
	},
	{
		id: 'react-expandable-grid',
		name: 'react-expandable-grid',
		status: ProjectStatus.DONE,
		description:
			'react-expandable-grid is a user-friendly component for React that simplifies' +
			' the creation of grids with expandable detail views.',
		longDescription:
			'react-expandable-grid is a simple-to-use component designed to create' +
			' grids with an expanding detail view. It provides an easy solution for quickly' +
			' setting up galleries and portfolios in your React applications. With this' +
			' component, when a user clicks on an element of your choice, a preview window opens' +
			' up, displaying a larger (or smaller, depending on the settings) area where you can' +
			' customize and showcase your content as desired. This grid, for example, is using' +
			' it.',
		href: '/projects/react-expandable-grid',
		tileGradient: 'linear-gradient(135deg, rgba(8, 28, 40, 0.95) 0%, rgba(18, 64, 88, 0.95)' + '100%)',
		tileIcon: 'wand-magic-sparkles',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/react-expandable-grid',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/react-expandable-grid?tab=MIT-1-ov-file#readme',
		links: [
			{
				icon: 'globe',
				host: 'Demo (Storybook)',
				href: 'http://demo.temmi.land/react-expandable-grid/'
			}
		],
		techStack: ['TypeScript', 'Vite', 'React', 'Storybook', 'Bun', 'Node.js & NPM'],
		docs: []
	}
];
