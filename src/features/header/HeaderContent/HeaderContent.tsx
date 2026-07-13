/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { styled } from 'styled-components';
import { pages } from '@/data/pages';
import PageCardList from '@/features/header/PageCardList';
import Signature from '@/features/me/Signature';
import Link from '@/ui/Link';
import { media } from '@/styles';


const HeaderContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	box-shadow: 0 0.28vw 2.08vw rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(1.39vw);
	-webkit-backdrop-filter: blur(1.39vw);
	top: 0;
	width: 100%;
	height: 3.82vw;
	position: absolute;
	display: grid;
	grid-template-columns: max-content 1fr;
	column-gap: 3.47vw;

	${media.mobile} {
		height: 20vw;
		grid-template-columns: 40% 60%;
		column-gap: 0;
	}

	${media.tablet} {
		height: 10vw;
		grid-template-columns: 40% 65%;
		column-gap: 0;
	}

	${media.wide} {
		box-shadow: 0 5.5px 42px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(28px);
		-webkit-backdrop-filter: blur(28px);
		height: 75px;
	}
`;

/*
 * The signature is sized as a fraction of the header height at every
 * breakpoint and vertically centred, so it stays balanced and can never be
 * clipped. Left padding matches the horizontal margin used by section
 * headings (6.5vw / 130px ≥2000px), so the header aligns with page content.
 * (HeaderContent heights: 3.82vw desktop / 10vw tablet / 20vw phone / 75px ≥2000px.)
 */
const LinkContainer = styled.div`
	display: flex;
	align-items: center;
	min-width: 0;
	overflow: hidden;
	padding-left: 6.5vw;

	.signature {
		height: 2.2vw;
		width: auto;
		max-width: 100%;
	}

	${media.mobile} {
		.signature {
			height: 8vw;
		}
	}

	${media.tablet} {
		.signature {
			height: 5vw;
		}
	}

	${media.wide} {
		padding-left: 130px;

		.signature {
			height: 42px;
		}
	}
`;

export const HeaderContent = () => {
	return (
		<HeaderContainer>
			<LinkContainer>
				<Link href={ '/' }>
					<Signature disableAnimation={ true } />
				</Link>
			</LinkContainer>
			<PageCardList pages={ pages } />
		</HeaderContainer>
	)
};