/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { ProjectStatus } from '../models/projectstatus.d';

export const projects: Project[] = [
	{
		id: 'vokse',
		name: 'Vokse',
		status: ProjectStatus.WORKING_ON,
		description: 'Vokse is an app concept where users can track the status of their plants,'
			+ ' such as watering schedules, fertilizer needs, and more.',
		longDescription: 'Vokse (/ˈʋɔksə/) is an app concept where users can track the status of'
			+ ' their plants, such as watering schedules, fertilizer needs, and more. The app will'
			+ ' provide notifications and allow users to document photos and details in a timeline'
			+ ' format for easy reference and sharing.',
		href: '/project/vokse',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(45deg, #1c6e51 0%, #189c3b 100%)',
		tileIcon: 'seedling',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		demoHost: '',
		demoHref: '',
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
	},
	{
		id: 'alimonia',
		name: 'alimonia',
		status: ProjectStatus.PAUSED,
		description: 'alimonia is an app for recipe storage and calendar-like organization to'
			+ ' create weekly nutrition plans and optimize your food purchases.',
		longDescription: 'The idea behind alimonia is to allow users to easily input their favorite'
			+ ' recipes, schedule them for specific days, and generate comprehensive meal plans'
			+ ' tailored to their dietary preferences and requirements. The envisioned app would'
			+ ' feature an intuitive interface to ensure seamless navigation and efficient meal'
			+ ' planning, empowering users to make healthier food choices and manage their culinary'
			+ ' routines with ease.',
		href: '/project/alimonia',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(90deg, #1c6e51 0%, #3a9c5e 100%)',
		tileIcon: 'carrot',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/alimonia/',
		license: '',
		licenseHref: '',
		demoHost: '',
		demoHref: '',
		techStack: [
			'keycloak',
			'swift',
			'vapor',
			'MongoDB',
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
	},
	/*{
		id: 'harmony-hills',
		name: 'Harmony Hills',
		status: ProjectStatus.PAUSED,
		description: 'A relaxing farm game where players can cultivate their own peaceful world,'
			+ ' grow crops, and help fulfill tasks for the villagers.',
		longDescription: 'The idea behind this project is to create a relaxing farm game as a'
			+ ' learning experience for developing mobile games with Unreal Engine. In this game,'
			+ ' players could cultivate their own peaceful world, grow crops, and help fulfill'
			+ ' tasks for the villagers.',
		href: '/project/harmony-hills',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(0deg, rgb(253, 200, 48) 0%, rgb(243, 115, 53) 100%)',
		tileIcon: 'mountain',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		demoHost: '',
		demoHref: '',
		techStack: [
			'UnrealEngine 5',
			'pixel art',
			'mobile game development'
		],
		docs: []
	},*/
	{
		id: 'react-fileicons',
		name: 'react-fileicons',
		status: ProjectStatus.DONE,
		description: 'Simple and intuitive react component for visualizing file icons.',
		longDescription: 'react-fileicons is a simple and intuitive React component for visualizing'
			+ ' file icons. The component allows users to easily integrate and customize file icons'
			+ ' by utilizing various color schemes and icon styles. With the ability to use custom'
			+ ' color configurations and adjust the size of icons variably, react-fileicons'
			+ ' provides a flexible solution for displaying file icons in React applications.',
		href: '/project/react-fileicons',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(45deg, #FF8E53 0%, #FF2C68 100%)',
		tileIcon: 'file-code',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/react-fileicons',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/react-fileicons?tab=MIT-1-ov-file#readme',
		demoHost: 'Demo (Storybook)',
		demoHref: 'http://demo.temmi.land/react-fileicons/',
		techStack: [
			'javascript',
			'react',
			'babel',
			'styled-components',
			'storybook',
			'nodejs',
			'npm'
		],
		docs: []
	},
	{
		id: 'react-expandable-grid',
		name: 'react-expandable-grid',
		status: ProjectStatus.DONE,
		description: 'react-expandable-grid is a user-friendly component for React that simplifies'
			+ ' the creation of grids with expandable detail views.',
		longDescription: 'react-expandable-grid is a simple-to-use component designed to create'
			+ ' grids with an expanding detail view. It provides an easy solution for quickly'
			+ ' setting up galleries and portfolios in your React applications. With this'
			+ ' component, when a user clicks on an element of your choice, a preview window opens'
			+ ' up, displaying a larger (or smaller, depending on the settings) area where you can'
			+ ' customize and showcase your content as desired. This grid, for example, is using'
			+ ' it.',
		href: '/project/react-expandable-grid',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(135deg, rgba(10, 50, 70, 0.8) 0%, rgba(30, 140, 190, 0.8)'
			+ '100%)',
		tileIcon: 'wand-magic-sparkles',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/react-expandable-grid',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/react-expandable-grid?tab=MIT-1-ov-file#readme',
		demoHost: 'Demo (Storybook)',
		demoHref: 'http://demo.temmi.land/react-expandable-grid/',
		techStack: [
			'typescript',
			'vitejs',
			'react',
			'storybook',
			'bun',
			'npm'
		],
		docs: []
	},
	{
		id: 'gj-sharepic-creator',
		name: 'gj-sharepic-creator',
		status: ProjectStatus.WORKING_ON,
		description: 'This project makes it easy to create Instagram share pics and stories in the'
			+ ' new corporate design of GRÜNE JUGEND.',
		longDescription: 'As GRÜNE JUGEND Dresden, we regularly create posts for Instagram.'
			+ ' Whether it\'s stories or sharepics – the creation process is often tedious, and'
			+ ' not all of our members are proficient with image editing software. That\'s why'
			+ ' we\'ve turned the standard templates of the 2024 corporate design into a web'
			+ ' application, making it easy for our members to create content for Instagram.',
		href: '/project/gj-sharepic-creator',
		isVisibleOnHome: true,
		tileGradient: 'linear-gradient(45deg, rgb(199, 255, 122), rgb(159, 136, 255),'
			+ ' rgb(242, 138, 222), rgb(255, 133, 104))',
		tileIcon: 'camera',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/gj-sharepic-creator',
		license: 'AGPL License v3',
		licenseHref: 'https://github.com/temmiland/gj-sharepic-creator?tab=AGPL-3.0-1-ov-file',
		demoHost: 'Webpage',
		demoHref: 'https://gjshare.pics',
		techStack: [
			'typescript',
			'vitejs',
			'react',
			'bun',
			'npm'
		],
		docs: []
	},
	{
		id: 'liquidium',
		name: 'liquidium',
		status: ProjectStatus.DONE,
		description: 'liquidium is a wiki tool written in JavaScript with ReactJS with a'
			+ ' Spring Backend written in Java.',
		longDescription: 'liquidium is a wiki tool, developed as my apprentice project,'
			+ ' using JavaScript and ReactJS for the frontend, and a robust Spring backend written'
			+ ' in Java. This project highlights the seamless data flow from the frontend to the'
			+ ' backend, ultimately storing information in a Couchbase database. By leveraging'
			+ ' modern web technologies, liquidium provides an efficient and user-friendly platform'
			+ ' for collaborative content creation and management, showcasing my ability to'
			+ ' integrate dynamic and responsive interfaces with reliable and scalable server-side'
			+ ' architectures.',
		href: '/project/liquidium',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #6b8eae 0%, #496b8c 100%)',
		tileIcon: 'water',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/liquidium',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/liquidium?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'Java',
			'Spring Boot',
			'lombok',
			'gson',
			'docker',
			'couchbase',
			'javascript',
			'react',
			'redux',
			'redux-loop',
			'redux-persist',
			'react-quill',
			'quill-delta',
			'react-oidc',
			'react-select',
			'axios',
			'lodash',
			'nodejs',
			'npm',
			'maven'
		],
		docs: []
	},
	{
		id: 'pxworlds',
		name: 'pxWorlds',
		status: ProjectStatus.DONE,
		description: 'A game prototype written with Java and LWJGL.',
		longDescription: 'This Java game prototype, developed using LWJGL (Lightweight Java Game'
			+ ' Library), was inspired by a detailed tutorial series. The project demonstrates the'
			+ ' practical application of LWJGL for creating interactive and engaging game'
			+ ' experiences, highlighting key concepts such as graphics rendering, input handling,'
			+ ' and game physics. Through this prototype, I\'ve gained valuable insights into game'
			+ ' development and showcased my ability to implement complex features using Java and'
			+ ' LWJGL.',
		href: '/project/pxworlds',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #708090 0%, #2f4f4f 100%)',
		tileIcon: 'gamepad',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/pxWorlds',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/pxWorlds?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'Java',
			'lwjgl 3',
			'gradle'
		],
		docs: []
	},
	{
		id: 'friendify',
		name: 'friendify',
		status: ProjectStatus.PAUSED,
		description: 'friendify is an app concept designed to help users form groups and share'
			+ ' their availability in a calendar view. This makes it easier to plan get-togethers.',
		longDescription: 'The idea behind friendify is to develop an app that allows users to form'
			+ ' groups and share their availability for meetups through a calendar view. This app'
			+ ' aims to help users see the availability of their friend groups, making it easier to'
			+ ' plan outings and get-togethers. By providing a centralized platform for'
			+ ' coordinating schedules, friendify seeks to simplify the process of organizing group'
			+ ' activities and ensuring everyone can participate.',
		href: '/project/friendify',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #ffa07a 0%, #944a1e 100%)',
		tileIcon: 'user-group',
		repoHost: '',
		repoIcon: '',
		repoHref: '',
		license: '',
		licenseHref: '',
		demoHost: '',
		demoHref: '',
		techStack: [
			'keycloak',
			'MongoDB',
			'typescript',
			'react-native',
			'react-native-calendars',
			'expo',
			'styled-components',
			'i18njs',
			'nodejs',
			'npm'
		],
		docs: []
	},
	{
		id: 'expo-dynamic-app-icon',
		name: 'expo-dynamic-app-icon',
		status: ProjectStatus.DONE,
		description: 'expo-dynamic-app-icon is a expo plugin that enables you to'
			+ ' programmatically change the app icon in an Expo app.',
		longDescription: 'expo-dynamic-app-icon is a expo plugin that enables you to'
			+ ' programmatically change the app icon in an Expo app. This includes support for'
			+ ' Android\'s monochrome icon variant and iOS 18\'s dark and tinted icon styles,'
			+ ' providing a flexible solution for dynamic icon customization across platforms.',
		href: '/project/expo-dynamic-app-icon',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #00A572 0%, #00D7A9 100%)',
		tileIcon: 'comments',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/expo-dynamic-app-icon',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/expo-dynamic-app-icon?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'typescript',
			'kotlin',
			'swift',
			'expo',
			'react-native'
		],
		docs: []
	},
	{
		id: 'traefik-matrix-docker',
		name: 'traefik-matrix-docker',
		status: ProjectStatus.WORKING_ON,
		description: 'The traefik-matrix-docker repository is a project designed to streamline the'
			+ ' deployment of a Matrix server using Docker and Traefik.',
		longDescription: 'The traefik-matrix-docker repository is a project designed to streamline'
			+ ' the deployment of a Matrix server using Docker and Traefik. By leveraging the'
			+ ' capabilities of Docker for containerization and Traefik for dynamic reverse proxy'
			+ ' management, this repository provides an efficient and scalable solution for setting'
			+ ' up and managing a Matrix server. The project simplifies the process, making it'
			+ ' accessible for both beginners and experienced developers.',
		href: '/project/traefik-matrix-docker',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(225deg, rgba(24,125,157,1) 0%, rgba(34,195,166,1) 100%)',
		tileIcon: 'comments',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/traefik-matrix-docker',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/traefik-matrix-docker?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'docker',
			'traefik',
			'matrix',
			'element'
		],
		docs: []
	},
	{
		id: 'compose-redux-kit',
		name: 'compose-redux-kit',
		status: ProjectStatus.DONE,
		description: 'ComposeReduxKit is a sample application that shows what a redux-like'
			+ ' implementation of actions, reducer, and global state might look like in Kotlin'
			+ ' Compose Multiplatform.',
		longDescription: 'ComposeReduxKit is a sample application that shows what a Redux-like'
			+ ' implementation of actions, reducers, and global state might look like in Kotlin'
			+ ' Compose Multiplatform. I created this project while teaching myself Kotlin. It'
			+ ' demonstrates how to apply the core concepts of Redux in a multiplatform'
			+ ' environment.',
		href: '/project/compose-redux-kit',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(135deg, #00757F 0%, #00A8A8 100%)',
		tileIcon: 'comments',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/compose-redux-kit',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/compose-redux-kit?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'kotlin',
			'compose'
		],
		docs: []
	},
	{
		id: 'spigot-itemeventsearch',
		name: 'ItemEventSearch',
		status: ProjectStatus.DONE,
		description: 'ItemEventSearch is a minecraft plugin that allows server operators to run a'
			+ '  small mini-game in the form of an item search.',
		longDescription: 'ItemEventSearch is a Minecraft plugin designed to allow server operators'
			+ ' to host a fun mini-game where players search for specific items. This plugin'
			+ ' enhances the gameplay experience by introducing engaging scavenger hunts, making it'
			+ ' perfect for events and activities on your Minecraft server. Easy to install and'
			+ ' configure, ItemEventSearch offers a simple yet exciting way to entertain players'
			+ ' and add variety to your servers activities.',
		href: '/project/spigot-itemeventsearch',
		isVisibleOnHome: false,
		tileGradient: 'linear-gradient(60deg, #335253 0%, #d96636 100%)',
		tileIcon: 'cubes',
		repoHost: 'GitHub',
		repoIcon: 'github',
		repoHref: 'https://github.com/temmiland/spigot-itemeventsearch',
		license: 'MIT License',
		licenseHref: 'https://github.com/temmiland/spigot-itemeventsearch?tab=MIT-1-ov-file#readme',
		demoHost: '',
		demoHref: '',
		techStack: [
			'Java',
			'minecraft',
			'spigot',
			'bukkit'
		],
		docs: []
	}
]
