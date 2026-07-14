/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from '@/features/footer/Footer';
import { media } from '@/styles';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const FooterSection = styled.section`
	padding: 2.4vw 0;

	${media.mobile} {
		padding: 12vw 0;
	}

	${media.tablet} {
		padding: 3.75vw 0;
	}

	${media.wide} {
		padding: 48px 0;
	}
`;

const PageGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 400;
	bottom: 0;
	pointer-events: none;

	${media.wide} {
		background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 1) 250px,
				rgba(0, 0, 0, 0) 750px,
				rgba(0, 0, 0, 0) 2750px,
				rgba(0, 0, 0, 1) 3250px
			)
			no-repeat;
		background-attachment: fixed;
		background-size: 3500px 100%;
		background-position: center;
		min-height: 100%;
		min-width: 3250px;
		margin: 0;
	}
`;

const PageMountains = styled.div`
	position: relative;
	max-width: 3000px;
	height: 34vw;
	margin-left: auto;
	margin-right: auto;
	z-index: 300;
	background: url(/footer.svg);
	background-repeat: no-repeat;
	background-size: cover;
	pointer-events: none;
	margin-top: -45.25vw;

	${media.mobile} {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -154.5vw;
		margin-right: -45vw;
	}

	${media.tablet} {
		background-size: 235vw auto;
		height: 100vw;
		background-position: right center;
		margin-top: -106vw;
		margin-right: -30vw;
	}

	${media.wide} {
		background-size: cover;
		height: 1000px;
		margin-top: -1230px;
		background-position: center;
	}
`;

type PageLayoutProps = {
	/** Header element for the page. Rendered inside a plain wrapper section. */
	header: ReactNode;
	/** Page content, rendered between the header and the shared footer chrome. */
	children: ReactNode;
};

/**
 * Shared page chrome: header wrapper, footer, and the gradient/mountains
 * background decoration repeated at the bottom of every page. Previously
 * copy-pasted into every page component, which had let the mountains'
 * z-index (3 vs 300) and background url (relative vs absolute) drift apart
 * between pages - the relative `url(./footer.svg)` broke on any route with
 * more than one path segment (e.g. /project/:id), since the browser
 * resolved it against the current route instead of the site root.
 * @param {PageLayoutProps} props - The props for the PageLayout component.
 * @returns {JSX.Element} PageLayout JSX element.
 */
export default function PageLayout({ header, children }: PageLayoutProps) {
	return (
		<>
			<HeaderSection>{header}</HeaderSection>
			{children}
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
