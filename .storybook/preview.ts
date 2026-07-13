/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Preview } from '@storybook/react';

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

import './styles.css';

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ['Welcome', 'Components', 'Widgets', 'Layouts', 'Pages']
			}
		},
		//actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light', value: '#fff'
				},
				{
					name: 'page', value: '#141414'
				},
				{
					name: 'dark', value: '#060606'
				}
			]
		}
	}
};

export default preview;
