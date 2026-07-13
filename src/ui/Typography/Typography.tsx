/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { colors, fonts, fluid, media } from '@/styles';

const H0 = styled.h1`
	font-family: ${fonts.medium};
	color: ${colors.white};
	font-size: ${fluid(4.5)};
	z-index: 3;

	${media.belowDesktop} {
		font-size: 11.5vw;
		margin: 5vw 0 0 0 !important;
	}
`;

const H1 = styled.h1`
	font-family: ${fonts.medium};
	color: ${colors.white};
	font-size: ${fluid(2.2)};
	z-index: 3;
	margin: ${fluid(1)} 0;

	${media.mobile} {
		font-size: 6vw;
		margin: 20px 0;
	}

	${media.tablet} {
		font-size: 5vw;
		margin: 20px 0;
	}

	.h-icon {
		position: relative;

		&:first-of-type {
			color: ${colors.accentPink};
			font-size: ${fluid(1.2)};
			left: ${fluid(-0.5)};
			top: ${fluid(-1.8)};

			${media.belowDesktop} {
				font-size: 2.5vw;
				left: -1vw;
				top: -5vw;
			}
		}
		&:nth-of-type(2n) {
			color: ${colors.accentBlue};
			font-size: ${fluid(1.3)};
			top: ${fluid(0.1)};
			left: ${fluid(-0.9)};

			${media.belowDesktop} {
				font-size: 3vw;
				left: -1.25vw;
				top: -0.5vw;
			}
		}
		&:last-of-type {
			color: ${colors.accentPink};
			font-size: ${fluid(0.8)};
			top: ${fluid(1.3)};
			left: ${fluid(-3.1)};

			${media.belowDesktop} {
				font-size: 1.8vw;
				left: -7vw;
				top: 3vw;
			}
		}
	}
`;

const H2 = styled.h2`
	font-family: ${fonts.medium};
	color: ${colors.white};
	font-size: ${fluid(2)};
	z-index: 3;
	margin: ${fluid(1)} 0;

	${media.mobile} {
		font-size: 5vw;
	}

	${media.tablet} {
		font-size: 4vw;
	}
`;

const H3 = styled.h3`
	font-family: ${fonts.medium};
	color: ${colors.white};
	font-size: ${fluid(1.5)};
	z-index: 3;
	margin: ${fluid(1)} 0;

	${media.mobile} {
		font-size: 5.5vw;
	}

	${media.tablet} {
		font-size: 4vw;
	}
`;

const H4 = styled.h4`
	font-family: ${fonts.medium};
	color: ${colors.white};
	font-size: ${fluid(1.25)};
	z-index: 3;
	margin: ${fluid(1)} 0;

	${media.mobile} {
		font-size: 4vw;
	}

	${media.tablet} {
		font-size: 2.5vw;
	}
`;

const H2_ProjectHeader = styled.h2`
	font-family: ${fonts.medium};
	color: ${colors.white};
	margin: 1.47vw;
	font-size: ${fluid(1.2)};

	${media.mobile} {
		font-size: 5.4vw;
		margin: 6vw;
	}

	${media.tablet} {
		font-size: 3vw;
		margin: 3vw 3.5vw;
	}

	${media.wide} {
		margin: 30px;
	}

	svg {
		margin-right: ${fluid(0.15)};

		${media.belowDesktop} {
			margin-right: 3px;
		}
	}
`;

const P_Project = styled.p`
	margin: 0 0 ${fluid(0.6)} 0;
	padding: 0;
	font-size: ${fluid(1)};
	font-family: ${fonts.light};
	color: ${colors.surfaceLight};
	white-space: pre-line;

	${media.mobile} {
		font-size: 4vw;
	}

	${media.tablet} {
		font-size: 2.25vw;
	}
`;

const P_Project_Bold = styled.p`
	margin: 0 0 ${fluid(0.6)} 0;
	padding: 0;
	font-size: ${fluid(1)};
	font-family: ${fonts.medium};
	color: ${colors.surfaceLight};

	${media.mobile} {
		font-size: 4vw;
	}

	${media.tablet} {
		font-size: 2.25vw;
	}
`;

const P = styled.p`
	margin: 0 0 1em 0;
	font-family: ${fonts.light};
	text-align: left;
	font-size: ${fluid(1.125)};
	color: ${colors.white};
	z-index: 3;

	${media.mobile} {
		font-size: 4vw;
	}

	${media.tablet} {
		font-size: 2.5vw;
	}

	a {
		font-family: ${fonts.light};
		text-align: left;
		font-size: ${fluid(1.125)};
		text-decoration: underline;
		color: ${colors.white};
		z-index: 3;

		${media.mobile} {
			font-size: 4vw;
		}

		${media.tablet} {
			font-size: 2.5vw;
		}

		&:hover {
			color: ${colors.gray};
		}
	}

	strong {
		font-family: ${fonts.medium};
	}
`;

const P_Footer = styled.p`
	margin: 0 0 1em 0;
	font-family: ${fonts.medium};
	text-align: center;
	font-size: ${fluid(1.35)};
	color: ${colors.white};
	z-index: 3;

	${media.mobile} {
		font-size: 4.8vw;
	}

	${media.tablet} {
		font-size: 3.5vw;
	}

	.heart-icon {
		font-size: 1.3em;
	}
`;

const P_Header = styled.p`
	margin: 0;
	font-family: ${fonts.bold};
	text-align: center;
	font-size: ${fluid(1)};
	color: inherit;
	z-index: 3;

	${media.mobile} {
		font-size: 3vw;
	}

	${media.tablet} {
		font-size: 2.5vw;
	}
`;

const P_Copyright = styled.p`
	margin: 0 0 1em 0;
	font-family: ${fonts.regular};
	text-align: center;
	font-size: ${fluid(1.125)};
	color: ${colors.white};
	z-index: 3;

	${media.mobile} {
		font-size: 4vw;
	}

	${media.tablet} {
		font-size: 2.5vw;
	}

	.copyright-icon {
		font-size: ${fluid(1.05)};

		${media.mobile} {
			font-size: 3.9vw;
		}

		${media.tablet} {
			font-size: 2.4vw;
		}
	}
`;

const P_Navigation = styled.p`
	margin: 0;
	font-family: ${fonts.medium};
	text-align: center;
	font-size: ${fluid(0.9)};
	color: inherit;
	z-index: 3;

	${media.mobile} {
		font-size: 3.25vw;
	}

	${media.tablet} {
		font-size: 2vw;
	}
`;

const P_Trademark = styled.p`
	margin: 0;
	font-family: ${fonts.medium};
	text-align: center;
	font-size: 0.45vw;
	color: #8383837b;
	z-index: 3;

	${media.mobile} {
		font-size: 1.5vw;
	}

	${media.tablet} {
		font-size: 1vw;
	}

	${media.wide} {
		font-size: 12px;
	}
`;

/**
 * All supported typography variants.
 */
export type TypographyVariant =
	| 'h0'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'p'
	| 'project_header'
	| 'project_desc'
	| 'project_desc_bold'
	| 'header'
	| 'footer'
	| 'copyright'
	| 'navigation'
	| 'trademark';

/**
 * Maps each typography variant to the styled element rendering it.
 */
const variantComponents: Record<
	TypographyVariant,
	React.ComponentType<{ children?: React.ReactNode }>
> = {
	h0: H0,
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	p: P,
	project_header: H2_ProjectHeader,
	project_desc: P_Project,
	project_desc_bold: P_Project_Bold,
	header: P_Header,
	footer: P_Footer,
	copyright: P_Copyright,
	navigation: P_Navigation,
	trademark: P_Trademark
};

interface TypographyProps {
	/**
	 * React children prop
	 */
	children: React.ReactNode;
	/**
	 * What variant to use
	 */
	variant: TypographyVariant;
}

export const Typography = ({ variant, children = '' }: TypographyProps) => {
	const Component = variantComponents[variant];
	return <Component>{ children }</Component>;
};
