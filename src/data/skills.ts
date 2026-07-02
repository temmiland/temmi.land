/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { SkillCategory } from '../models/skillcategory.d';

const sectors: Skill[] = [
	{
		id: 'it-services',
		name: 'IT Services',
		category: SkillCategory.SECTORS,
		icon: 'laptop-code',
		years: 1,
		lastUsed: 2026
	},
	{
		id: 'healthcare',
		name: 'Healthcare',
		category: SkillCategory.SECTORS,
		icon: 'briefcase-medical',
		years: 1,
		lastUsed: 2026
	},
	{
		id: 'automotive',
		name: 'Automotive',
		category: SkillCategory.SECTORS,
		icon: 'car',
		years: 2,
		lastUsed: 2024
	},
	{
		id: 'wastewater-treatment',
		name: 'Wastewater Treatment',
		category: SkillCategory.SECTORS,
		icon: 'industry',
		years: 6,
		lastUsed: 2021
	},
	{
		id: 'construction',
		name: 'Construction',
		category: SkillCategory.SECTORS,
		icon: 'hard-hat',
		years: 6,
		lastUsed: 2021
	}
];

const languages: Skill[] = [
	{
		id: 'de',
		name: 'German',
		category: SkillCategory.LANGUAGES,
		description: 'C2 - Mother tongue',
		years: 28,
		lastUsed: 2026,
		icon: 'flag'
	},
	{
		id: 'en',
		name: 'English',
		category: SkillCategory.LANGUAGES,
		description: 'B1 - Intermediate',
		years: 18,
		lastUsed: 2026,
		icon: 'flag'
	},
	{
		id: 'no',
		name: 'Norwegian',
		category: SkillCategory.LANGUAGES,
		description: 'A1 - Beginner',
		years: 1,
		lastUsed: 2025,
		icon: 'flag'
	}
];

const programmingLanguages: Skill[] = [
	{
		id: 'typescript',
		name: 'TypeScript',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		isVisibleOnHome: true,
		rating: 5,
		years: 6,
		lastUsed: 2026,
		version: '6.0',
		icon: 'code'
	},
	{
		id: 'javascript',
		name: 'JavaScript',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		isVisibleOnHome: true,
		rating: 5,
		years: 11,
		lastUsed: 2026,
		version: 'ES2024',
		icon: 'js',
		iconPrefix: 'fab'
	},
	{
		id: 'java',
		name: 'Java',
		isVisibleOnHome: true,
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		version: '23',
		description: 'SE & EE',
		icon: 'java',
		iconPrefix: 'fab'
	},
	{
		id: 'kotlin',
		name: 'Kotlin',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 3,
		years: 2,
		lastUsed: 2024,
		version: '2.0',
		icon: 'code'
	},
	{
		id: 'swift',
		name: 'Swift',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 3,
		years: 2,
		lastUsed: 2025,
		version: '6',
		icon: 'swift',
		iconPrefix: 'fab'
	},
	{
		id: 'python',
		name: 'Python',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 2,
		years: 2,
		lastUsed: 2025,
		version: '3.13',
		icon: 'python',
		iconPrefix: 'fab'
	},
	{
		id: 'php',
		name: 'PHP',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 2,
		years: 2,
		lastUsed: 2020,
		version: '7.4',
		icon: 'php',
		iconPrefix: 'fab'
	},
	{
		id: 'csharp',
		name: 'C#',
		category: SkillCategory.PROGRAMMING_LANGUAGES,
		rating: 2,
		years: 2,
		version: '10',
		lastUsed: 2022,
		icon: 'code'
	}
];

const frontendTech: Skill[] = [
	{
		id: 'html',
		name: 'HTML',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 14,
		lastUsed: 2026,
		icon: 'html5',
		iconPrefix: 'fab'
	},
	{
		id: 'css',
		name: 'CSS',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 14,
		lastUsed: 2026,
		icon: 'css3-alt',
		iconPrefix: 'fab'
	},
	{
		id: 'scss-sass-less',
		name: 'SCSS / Sass / Less',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 8,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'json',
		name: 'JSON',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 14,
		lastUsed: 2026,
		icon: 'file-code'
	},
	{
		id: 'nodejs-npm',
		name: 'Node.js & NPM',
		category: SkillCategory.FRONTEND,
		rating: 4,
		years: 8,
		lastUsed: 2026,
		version: '24 LTS',
		icon: 'node-js',
		iconPrefix: 'fab'
	},
	{
		id: 'bun',
		name: 'Bun',
		category: SkillCategory.FRONTEND,
		rating: 4,
		years: 2,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'deno',
		name: 'Deno',
		category: SkillCategory.FRONTEND,
		rating: 3,
		years: 1,
		lastUsed: 2025,
		icon: 'palette'
	},
	{
		id: 'react',
		name: 'React',
		category: SkillCategory.FRONTEND,
		isVisibleOnHome: true,
		rating: 5,
		years: 8,
		lastUsed: 2026,
		version: '19',
		icon: 'react',
		iconPrefix: 'fab'
	},
	{
		id: 'angular',
		name: 'Angular',
		category: SkillCategory.FRONTEND,
		isVisibleOnHome: true,
		rating: 4,
		years: 5,
		lastUsed: 2026,
		version: '22',
		icon: 'angular',
		iconPrefix: 'fab'
	},
	{
		id: 'vue',
		name: 'Vue.js',
		category: SkillCategory.FRONTEND,
		rating: 2,
		years: 1,
		lastUsed: 2024,
		version: '3.4',
		icon: 'vuejs',
		iconPrefix: 'fab'
	},
	{
		id: 'vaadin',
		name: 'Vaadin',
		category: SkillCategory.FRONTEND,
		rating: 2,
		years: 1,
		lastUsed: 2022,
		icon: 'vaadin',
		iconPrefix: 'fab'
	},
	{
		id: 'tailwindcss',
		name: 'Tailwind CSS',
		category: SkillCategory.FRONTEND,
		rating: 2,
		years: 1,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'bootstrap',
		name: 'Bootstrap',
		category: SkillCategory.FRONTEND,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'material-ui',
		name: 'Material UI',
		category: SkillCategory.FRONTEND,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'ant-design',
		name: 'Ant Design',
		category: SkillCategory.FRONTEND,
		rating: 3,
		years: 2,
		lastUsed: 2022,
		icon: 'palette'
	},
	{
		id: 'styled-components',
		name: 'styled-components',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 8,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'redux',
		name: 'Redux',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 7,
		lastUsed: 2025,
		icon: 'palette'
	},
	{
		id: 'i18next',
		name: 'i18next',
		category: SkillCategory.FRONTEND,
		rating: 5,
		years: 6,
		lastUsed: 2026,
		icon: 'palette'
	},
	{
		id: 'transloco',
		name: 'Transloco',
		category: SkillCategory.FRONTEND,
		rating: 4,
		years: 1,
		lastUsed: 2026,
		icon: 'palette'
	}
];

const backendTech: Skill[] = [
	{
		id: 'spring-framework',
		name: 'Spring Framework',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 8,
		lastUsed: 2026,
		version: '7.0',
		icon: 'leaf'
	},
	{
		id: 'spring-boot',
		name: 'Spring Boot',
		category: SkillCategory.BACKEND,
		isVisibleOnHome: true,
		rating: 4,
		years: 8,
		lastUsed: 2026,
		version: '4.0',
		icon: 'leaf'
	},
	{
		id: 'spring-security',
		name: 'Spring Security',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 4,
		lastUsed: 2026,
		version: '7.0',
		icon: 'leaf'
	},
	{
		id: 'express',
		name: 'Express',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 3,
		lastUsed: 2026,
		version: '5',
		icon: 'leaf'
	},
	{
		id: 'maven',
		name: 'Maven',
		category: SkillCategory.BACKEND,
		rating: 4,
		years: 10,
		lastUsed: 2026,
		icon: 'leaf'
	},
	{
		id: 'gradle',
		name: 'Gradle',
		category: SkillCategory.BACKEND,
		rating: 4,
		years: 8,
		lastUsed: 2026,
		icon: 'leaf'
	},
	{
		id: 'tomcat',
		name: 'Tomcat',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 5,
		lastUsed: 2022,
		icon: 'leaf'
	},
	{
		id: 'jetty',
		name: 'Jetty',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 3,
		lastUsed: 2024,
		icon: 'leaf'
	},
	{
		id: 'apache-kafka',
		name: 'Apache Kafka',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 2,
		lastUsed: 2022,
		icon: 'leaf'
	},
	{
		id: 'netflix-eureka',
		name: 'Netflix Eureka',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 4,
		lastUsed: 2022,
		icon: 'leaf'
	},
	{
		id: 'netflix-zuul',
		name: 'Netflix Zuul',
		category: SkillCategory.BACKEND,
		rating: 3,
		years: 4,
		lastUsed: 2022,
		icon: 'leaf'
	},
	{
		id: 'yaml',
		name: 'YAML',
		category: SkillCategory.BACKEND,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'file-code'
	},
	{
		id: 'xml',
		name: 'XML',
		category: SkillCategory.BACKEND,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'file-code'
	},
	{
		id: 'openapi',
		name: 'OpenAPI / Swagger',
		category: SkillCategory.BACKEND,
		rating: 4,
		years: 8,
		lastUsed: 2026,
		icon: 'file-code'
	},
	{
		id: 'rest',
		name: 'REST',
		category: SkillCategory.BACKEND,
		rating: 5,
		years: 8,
		lastUsed: 2026,
		icon: 'file-code'
	}
];

const databases: Skill[] = [
	// Databases
	{
		id: 'postgresql',
		name: 'PostgreSQL',
		category: SkillCategory.DATABASES,
		rating: 3,
		years: 5,
		lastUsed: 2026,
		icon: 'database'
	},
	{
		id: 'mongodb',
		name: 'MongoDB',
		category: SkillCategory.DATABASES,
		rating: 3,
		years: 3,
		lastUsed: 2023,
		icon: 'database'
	},
	{
		id: 'sqlite',
		name: 'SQLite',
		category: SkillCategory.DATABASES,
		rating: 3,
		years: 3,
		lastUsed: 2026,
		icon: 'database'
	},
	{
		id: 'mssql',
		name: 'MS SQL',
		category: SkillCategory.DATABASES,
		rating: 2,
		years: 1,
		lastUsed: 2020,
		icon: 'database'
	},
	{
		id: 'mariadb',
		name: 'MariaDB',
		category: SkillCategory.DATABASES,
		rating: 4,
		years: 10,
		lastUsed: 2022,
		icon: 'database'
	},
	{
		id: 'mysql',
		name: 'MySQL',
		category: SkillCategory.DATABASES,
		rating: 4,
		years: 10,
		lastUsed: 2022,
		icon: 'database'
	}
];

const appDevelopment: Skill[] = [
	{
		id: 'android-studio',
		name: 'Android Studio',
		category: SkillCategory.APP_DEVELOPMENT,
		rating: 3,
		years: 3,
		lastUsed: 2026,
		icon: 'android',
		iconPrefix: 'fab'
	},
	{
		id: 'xcode',
		name: 'Xcode',
		category: SkillCategory.APP_DEVELOPMENT,
		rating: 3,
		years: 3,
		lastUsed: 2026,
		icon: 'apple',
		iconPrefix: 'fab'
	},
	{
		id: 'react-native',
		name: 'React Native',
		category: SkillCategory.APP_DEVELOPMENT,
		isVisibleOnHome: true,
		rating: 4,
		years: 3,
		lastUsed: 2026,
		icon: 'react',
		iconPrefix: 'fab'
	},
	{
		id: 'expo',
		name: 'Expo',
		category: SkillCategory.APP_DEVELOPMENT,
		rating: 4,
		years: 3,
		lastUsed: 2026,
		icon: 'react',
		iconPrefix: 'fab'
	}
];

const iam: Skill[] = [
	{
		id: 'keycloak',
		name: 'Keycloak',
		category: SkillCategory.IAM,
		isVisibleOnHome: true,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'key'
	},
	{
		id: 'oauth2',
		name: 'OAuth2',
		category: SkillCategory.IAM,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'key'
	},
	{
		id: 'openid-connect',
		name: 'OpenID Connect',
		category: SkillCategory.IAM,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'key'
	}
];

const testing: Skill[] = [
	{
		id: 'jest',
		name: 'Jest',
		category: SkillCategory.TESTING,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'vial-circle-check'
	},
	{
		id: 'junit',
		name: 'JUnit',
		category: SkillCategory.TESTING,
		rating: 4,
		years: 10,
		lastUsed: 2026,
		icon: 'vial-circle-check'
	},
	{
		id: 'cypress',
		name: 'Cypress',
		category: SkillCategory.TESTING,
		rating: 4,
		years: 6,
		lastUsed: 2026,
		icon: 'vial-circle-check'
	},
	{
		id: 'vitest',
		name: 'Vitest',
		category: SkillCategory.TESTING,
		rating: 4,
		years: 2,
		lastUsed: 2026,
		icon: 'vial-circle-check'
	},
	{
		id: 'react-testing-library',
		name: 'React Testing Library',
		category: SkillCategory.TESTING,
		rating: 3,
		years: 2,
		lastUsed: 2025,
		icon: 'vial-circle-check'
	}
];

const qualityAssurance: Skill[] = [
	{
		id: 'sonarqube',
		name: 'SonarQube',
		category: SkillCategory.QUALITY_ASSURANCE,
		rating: 3,
		years: 1,
		lastUsed: 2026,
		icon: 'search'
	},
	{
		id: 'scrum',
		name: 'Scrum',
		category: SkillCategory.QUALITY_ASSURANCE,
		isVisibleOnHome: true,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'project-diagram'
	},
	{
		id: 'kanban',
		name: 'Kanban',
		category: SkillCategory.QUALITY_ASSURANCE,
		rating: 4,
		years: 2,
		lastUsed: 2022,
		icon: 'project-diagram'
	}
];

const tools: Skill[] = [
	{
		id: 'git',
		name: 'Git',
		category: SkillCategory.TOOLS,
		isVisibleOnHome: true,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'git-alt',
		iconPrefix: 'fab'
	},
	{
		id: 'github',
		name: 'GitHub',
		category: SkillCategory.TOOLS,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'github',
		iconPrefix: 'fab'
	},
	{
		id: 'gitlab',
		name: 'GitLab',
		category: SkillCategory.TOOLS,
		rating: 4,
		years: 3,
		lastUsed: 2026,
		icon: 'gitlab',
		iconPrefix: 'fab'
	},
	{
		id: 'bitbucket',
		name: 'Bitbucket',
		category: SkillCategory.TOOLS,
		rating: 4,
		years: 6,
		lastUsed: 2022,
		icon: 'bitbucket',
		iconPrefix: 'fab'
	},
	{
		id: 'jira',
		name: 'Jira',
		category: SkillCategory.TOOLS,
		rating: 4,
		years: 6,
		lastUsed: 2022,
		icon: 'jira',
		iconPrefix: 'fab'
	},
	{
		id: 'confluence',
		name: 'Confluence',
		category: SkillCategory.TOOLS,
		rating: 4,
		years: 10,
		lastUsed: 2026,
		icon: 'confluence',
		iconPrefix: 'fab'
	},
	{
		id: 'intellij-idea',
		name: 'IntelliJ IDEA',
		category: SkillCategory.TOOLS,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'code'
	},
	{
		id: 'visual-studio-code',
		name: 'Visual Studio Code',
		category: SkillCategory.TOOLS,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'code'
	}
];

const ai: Skill[] = [
	{
		id: 'chatgpt',
		name: 'ChatGPT (OpenAI)',
		category: SkillCategory.AI,
		rating: 5,
		years: 3,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'codex',
		name: 'Codex (OpenAI)',
		category: SkillCategory.AI,
		rating: 4,
		years: 1,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'claude',
		name: 'Claude (Anthropic)',
		category: SkillCategory.AI,
		rating: 5,
		years: 2,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'claude-code',
		name: 'Claude Code (Anthropic)',
		category: SkillCategory.AI,
		rating: 4,
		years: 1,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'claude-design',
		name: 'Claude Design (Anthropic)',
		category: SkillCategory.AI,
		rating: 3,
		years: 1,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'context-engineering',
		name: 'Context Engineering',
		category: SkillCategory.AI,
		rating: 4,
		years: 1,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'prompt-engineering',
		name: 'Prompt Engineering',
		category: SkillCategory.AI,
		rating: 4,
		years: 2,
		lastUsed: 2026,
		icon: 'robot'
	},
	{
		id: 'agentic-development',
		name: 'Agentic Development',
		category: SkillCategory.AI,
		isVisibleOnHome: true,
		rating: 4,
		years: 1,
		lastUsed: 2026,
		icon: 'robot'
	}
];

const cicd: Skill[] = [
	{
		id: 'docker',
		name: 'Docker',
		category: SkillCategory.CICD,
		isVisibleOnHome: true,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'docker',
		iconPrefix: 'fab'
	},
	{
		id: 'kubernetes',
		name: 'Kubernetes',
		category: SkillCategory.CICD,
		rating: 3,
		years: 3,
		lastUsed: 2026,
		icon: 'wrench'
	},
	{
		id: 'openshift',
		name: 'OpenShift',
		category: SkillCategory.CICD,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'wrench'
	},
	{
		id: 'jenkins',
		name: 'Jenkins',
		category: SkillCategory.CICD,
		rating: 3,
		years: 6,
		lastUsed: 2022,
		icon: 'jenkins',
		iconPrefix: 'fab'
	},
	{
		id: 'gitlab-ci',
		name: 'GitLab CI',
		category: SkillCategory.CICD,
		rating: 4,
		years: 3,
		lastUsed: 2026,
		icon: 'gitlab',
		iconPrefix: 'fab'
	},
	{
		id: 'github-actions',
		name: 'GitHub Actions',
		category: SkillCategory.CICD,
		rating: 4,
		years: 5,
		lastUsed: 2026,
		icon: 'github',
		iconPrefix: 'fab'
	}
];

const geodata: Skill[] = [
	{
		id: 'leaflet',
		name: 'Leaflet',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	},
	{
		id: 'openlayers',
		name: 'OpenLayers',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	},
	{
		id: 'google-maps-api',
		name: 'Google Maps API',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	},
	{
		id: 'openstreetmap',
		name: 'OpenStreetMap',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	},
	{
		id: 'geoserver',
		name: 'GeoServer',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	},
	{
		id: 'postgis',
		name: 'PostGIS',
		category: SkillCategory.GIS_GEODATA,
		rating: 2,
		years: 1,
		lastUsed: 2021,
		icon: 'map'
	}
];

const os: Skill[] = [
	{
		id: 'linux',
		name: 'Linux',
		category: SkillCategory.OS,
		rating: 4,
		years: 10,
		lastUsed: 2026,
		icon: 'linux',
		iconPrefix: 'fab'
	},
	{
		id: 'windows',
		name: 'Windows',
		category: SkillCategory.OS,
		rating: 3,
		years: 20,
		lastUsed: 2022,
		icon: 'windows',
		iconPrefix: 'fab'
	},
	{
		id: 'macos',
		name: 'macOS',
		category: SkillCategory.OS,
		rating: 5,
		years: 6,
		lastUsed: 2026,
		icon: 'apple',
		iconPrefix: 'fab'
	},
	{
		id: 'android',
		name: 'Android',
		category: SkillCategory.OS,
		rating: 3,
		years: 6,
		lastUsed: 2026,
		icon: 'android',
		iconPrefix: 'fab'
	},
	{
		id: 'ios',
		name: 'iOS',
		category: SkillCategory.OS,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'apple',
		iconPrefix: 'fab'
	}
];

const other: Skill[] = [
	{
		id: 'wordpress',
		name: 'WordPress',
		category: SkillCategory.OTHER,
		rating: 2,
		years: 4,
		lastUsed: 2022,
		icon: 'wordpress',
		iconPrefix: 'fab'
	},
	{
		id: 'apache-ofbiz',
		name: 'Apache OFBiz',
		category: SkillCategory.OTHER,
		rating: 4,
		years: 6,
		lastUsed: 2021,
		icon: 'code'
	},
	{
		id: 'component-based-development',
		name: 'Component-Based Development',
		category: SkillCategory.OTHER,
		rating: 5,
		years: 8,
		lastUsed: 2026,
		icon: 'code'
	},
	{
		id: 'network-internet-technologies',
		name: 'Network & Internet Technologies',
		category: SkillCategory.OTHER,
		rating: 4,
		years: 10,
		lastUsed: 2026,
		icon: 'code'
	},
	{
		id: 'object-oriented-programming',
		name: 'Object-Oriented Programming',
		category: SkillCategory.OTHER,
		rating: 5,
		years: 10,
		lastUsed: 2026,
		icon: 'code'
	}
];

export const skills: Skill[] = [
	...sectors,
	...languages,
	...programmingLanguages,
	...frontendTech,
	...backendTech,
	...databases,
	...appDevelopment,
	...iam,
	...testing,
	...qualityAssurance,
	...tools,
	...ai,
	...cicd,
	...geodata,
	...os,
	...other
];
