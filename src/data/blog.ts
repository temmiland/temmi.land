/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { BlogPost } from '@/models/blogpost';

export const blogPosts: BlogPost[] = [
	{
		id: 'alimonia-on-the-app-store',
		title: 'alimonia is now available on the App Store',
		date: '2026-07-08',
		readingMinutes: 3,
		excerpt:
			'alimonia has arrived on iOS. My local-first app for recipes, meal plans and' +
			' shopping lists is now a free download on the App Store - here is what iPhone users' +
			' can do with it today.',
		tags: ['alimonia', 'Release', 'iOS', 'React Native', 'Local-first'],
		icon: 'apple',
		iconPrefix: 'fab',
		tileGradient: 'linear-gradient(135deg, #0a2540 0%, #1f6fb2 100%)',
		projectId: 'alimonia',
		content: [
			{
				type: 'paragraph',
				text:
					'alimonia is now on the App Store. After launching on Android, the same' +
					' local-first recipe and meal-planning app is available for iPhone today - no' +
					' account, no waitlist, just a free download away.'
			},
			{
				type: 'store-badge',
				store: 'app-store',
				href: 'https://apps.apple.com/app/alimonia/id6781319686'
			},
			{
				type: 'heading',
				text: 'What alimonia is'
			},
			{
				type: 'paragraph',
				text:
					"alimonia flips the usual recipe-app formula on its head. There's no sign-up" +
					' wall, no cloud you have to trust and no loading spinner between you and your' +
					' next meal - the app is ready the instant it finishes installing. Everything you' +
					' create, from a single recipe to a full week of meals and the shopping list that' +
					' falls out of it, lives on your iPhone first, so alimonia stays quick and keeps' +
					" working even when your connection doesn't."
			},
			{
				type: 'heading',
				text: 'What you can do on iPhone'
			},
			{
				type: 'paragraph',
				text:
					'Create recipes by hand, import them from a URL, or share them straight into' +
					' alimonia from Safari and other apps through the iOS share sheet - with' +
					' photo-based text recognition pulling out ingredients and steps for you. Drop' +
					' those recipes onto specific days in a weekly plan, and alimonia automatically' +
					" compiles a shopping list from everything you've scheduled. It all works" +
					' offline and on-device, with no account and no sign-up required.'
			},
			{
				type: 'gallery',
				images: [
					{
						src: '/blog/ios_screen_1_en.webp',
						alt: 'The alimonia recipe list screen on iPhone',
						caption: 'Your whole recipe collection, right in your pocket.'
					},
					{
						src: '/blog/ios_screen_2_en.webp',
						alt: 'The alimonia meal plan screen on iPhone',
						caption: "Drag recipes onto the days you'll cook them."
					},
					{
						src: '/blog/ios_screen_3_en.webp',
						alt: 'The alimonia shopping list screen on iPhone',
						caption: 'The shopping list writes itself.'
					},
					{
						src: '/blog/ios_screen_4_en.webp',
						alt: 'A recipe imported into alimonia on iPhone',
						caption: 'Pull in a recipe from a link in seconds.'
					}
				]
			},
			{
				type: 'heading',
				text: 'Built for iOS with React Native'
			},
			{
				type: 'paragraph',
				text:
					'alimonia is built with React Native and Expo, with all data living primarily' +
					' in an on-device SQLite database and React Query handling caching and state on' +
					' top. On iOS that means tight integration with the native share sheet and text' +
					' recognition, support for the light, dark and tinted home-screen icon styles,' +
					' and an app that stays fast and fully functional offline.'
			},
			{
				type: 'heading',
				text: "What's next"
			},
			{
				type: 'paragraph',
				text:
					'With both Android and iOS now live, alimonia is available wherever you cook.' +
					" I'll keep sharing progress on new features - smarter imports and more - here" +
					" on the blog. If you give alimonia a try, I'd love to hear what you think."
			},
			{
				type: 'store-badge',
				store: 'app-store',
				href: 'https://apps.apple.com/app/alimonia/id6781319686'
			}
		]
	},
	{
		id: 'alimonia-on-google-play',
		title: 'alimonia is now available on Google Play',
		date: '2026-07-03',
		readingMinutes: 3,
		excerpt:
			'After months of development, alimonia - my local-first app for recipes, meal' +
			' plans and shopping lists - has landed on the Google Play Store. Here is what that' +
			' means and what you can do with it today.',
		tags: ['alimonia', 'Release', 'Android', 'React Native', 'Local-first'],
		icon: 'android',
		iconPrefix: 'fab',
		tileGradient: 'linear-gradient(90deg, #0a2e1c 0%, #226b3e 100%)',
		projectId: 'alimonia',
		content: [
			{
				type: 'paragraph',
				text:
					"It's official: alimonia is now available on the Google Play Store. After" +
					' months of development, the app you can install on your Android phone today is' +
					" the same local-first recipe and meal-planning app I've been working on - no" +
					' waitlist, no early-access code, just a download away.'
			},
			{
				type: 'store-badge',
				store: 'google-play',
				href: 'https://play.google.com/store/apps/details?id=land.temmi.alimonia'
			},
			{
				type: 'image',
				src: '/blog/google_presentation.webp',
				alt: 'alimonia on the Google Play Store',
				caption: 'alimonia is now live on the Google Play Store.'
			},
			{
				type: 'heading',
				text: 'What alimonia is'
			},
			{
				type: 'paragraph',
				text:
					"Most recipe and meal-planning apps assume you're always online and want you" +
					" signed in before you've even seen a recipe. alimonia takes the opposite" +
					" approach: it's fully usable the moment you install it, without an account and" +
					' without an internet connection. Your recipes, weekly plans and shopping lists' +
					' live on your device first, so the app stays fast and works anywhere - including' +
					' the corner of the supermarket where the signal drops out.'
			},
			{
				type: 'heading',
				text: 'What you can do in this release'
			},
			{
				type: 'paragraph',
				text:
					'Create recipes by hand, import them from a URL, or share them straight into' +
					" alimonia from other apps through Android's native share sheet - with" +
					' photo-based text recognition pulling out ingredients and steps for you. Drop' +
					' those recipes onto specific days in a weekly plan, and alimonia automatically' +
					" compiles a shopping list from everything you've scheduled. It all works" +
					' offline and on-device, with no account and no sign-up required.'
			},
			{
				type: 'gallery',
				images: [
					{
						src: '/blog/screen_1_en.webp',
						alt: 'The alimonia recipe list screen',
						caption: 'All recipes always with you.'
					},
					{
						src: '/blog/screen_2_en.webp',
						alt: 'The alimonia meal plan screen',
						caption: 'Plan meals instead of writing shopping lists.'
					},
					{
						src: '/blog/screen_3_en.webp',
						alt: 'The alimonia shopping list screen',
						caption: 'An automatic shopping list.'
					},
					{
						src: '/blog/screen_4_en.webp',
						alt: 'A recipe imported into alimonia',
						caption: 'Import recipes in seconds.'
					}
				]
			},
			{
				type: 'heading',
				text: "What's under the hood"
			},
			{
				type: 'paragraph',
				text:
					'alimonia is built with React Native and Expo, with all data living primarily' +
					' in an on-device SQLite database and React Query handling caching and state on' +
					' top. Building it local-first keeps the app fast and fully functional offline,' +
					' and means your recipes and plans stay on your device.'
			},
			{
				type: 'heading',
				text: "What's next"
			},
			{
				type: 'paragraph',
				text:
					'The Android release is just the first step. An iOS version for the App Store' +
					" is on the way, and I'll keep sharing progress on new features - smarter" +
					" imports and more - here on the blog. If you give alimonia a try, I'd love to" +
					' hear what you think.'
			},
			{
				type: 'store-badge',
				store: 'google-play',
				href: 'https://play.google.com/store/apps/details?id=land.temmi.alimonia'
			}
		]
	}
];
