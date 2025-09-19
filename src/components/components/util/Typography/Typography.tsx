/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Typography as Typo } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typo;

interface TypographyProps {
	/**
	 * React children prop
	 */
	children: React.ReactNode;
	/**
	 * What variant to use
	 */
	variant?: string;
	/**
	 * What href to link
	 */
	href?: string;
}

const H0 = styled.h1`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	font-size: 4.5vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 1024px) {
		font-size: 11.5vw;
		margin: 5vw 0 0 0 !important;
	}

	@media (min-width: 2000px) {
		font-size: 90px;
	}
`;

const H1 = styled.h1`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	font-size: 2.2vw;
	color: #fff;
	z-index: 3;
	margin: 1vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 6vw;
		margin: 20px 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 5vw;
		margin: 20px 0;
	}

	@media (min-width: 2000px) {
		font-size: 44px;
		margin: 20px 0;
	}

	.h-icon {
		position: relative;

		&:first-of-type {
			color: #d698a1;
			font-size: 1.2vw;
			left: -0.5vw;
			top: -1.8vw;

			@media (min-width: 320px) and (max-width: 1024px) {
				font-size: 2.5vw;
				left: -1vw;
				top: -5vw;
			}

			@media (min-width: 2000px) {
				font-size: 24px;
				left: -10px;
				top: -36px;
			}
		}
		&:nth-of-type(2n) {
			color: #80cee1;
			font-size: 1.3vw;
			top: 0.1vw;
			left: -0.9vw;

			@media (min-width: 320px) and (max-width: 1024px) {
				font-size: 3vw;
				left: -1.25vw;
				top: -0.5vw;
			}

			@media (min-width: 2000px) {
				font-size: 26px;
				top: 2px;
				left: -18px;
			}
		}
		&:last-of-type {
			color: #d698a1;
			font-size: 0.8vw;
			top: 1.3vw;
			left: -3.1vw;

			@media (min-width: 320px) and (max-width: 1024px) {
				font-size: 1.8vw;
				left: -7vw;
				top: 3vw;
			}

			@media (min-width: 2000px) {
				font-size: 16px;
				top: 26px;
				left: -62px;
			}
		}
	}
`;

const H2 = styled.h2`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	font-size: 2vw;
	color: #fff;
	z-index: 3;
	margin: 1vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 4vw;
	}

	@media (min-width: 2000px) {
		margin: 20px 0;
		font-size: 40px;
	}
`;

const H3 = styled.h3`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	font-size: 1.5vw;
	color: #fff;
	z-index: 3;
	margin: 1vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 5.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 4vw;
	}

	@media (min-width: 2000px) {
		margin: 20px 0;
		font-size: 30px;
	}
`;

const H4 = styled.h3`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	font-size: 1.25vw;
	z-index: 3;
	margin: 1vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.5vw;
	}

	@media (min-width: 2000px) {
		margin: 20px 0;
		font-size: 25px;
	}
`;

const H1_ProjectHeader = styled.h1`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #fff;
	margin: 1.47vw;
	font-size: 1.2vw;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 5.4vw;
		margin: 6vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 3vw;
		margin: 3vw 3.5vw;
	}

	@media (min-width: 2000px) {
		margin: 30px;
		font-size: 24px;
	}

	svg {
		margin-right: 0.15vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			margin-right: 3px;
		}

		@media (min-width: 2000px) {
			margin-right: 3px;
		}
	}
`;

const P_Project = styled.p`
	margin: 0 0 0.6vw 0;
	padding: 0;
	font-size: 1vw;
	font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #222222;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.25vw;
	}

	@media (min-width: 2000px) {
		margin: 0 0 12px 0;
		font-size: 20px;
	}
`;

const P_Project_Bold = styled.p`
	margin: 0 0 0.6vw 0;
	padding: 0;
	font-size: 1vw;
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	color: #222222;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.25vw;
	}

	@media (min-width: 2000px) {
		margin: 0 0 12px 0;
		font-size: 20px;
	}
`;

const P = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: left;
	font-size: 1.125vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.5vw;
	}

	@media (min-width: 2000px) {
		font-size: 22.5px;
	}

	a {
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
		text-align: left;
		font-size: 1.125vw;
		text-decoration: underline;
		color: #fff;
		z-index: 3;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2.5vw;
		}

		@media (min-width: 2000px) {
			font-size: 22.5px;
		}

		&:hover {
			color: #8B8B8B;
		}
	}
`;

const P_Footer = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	font-size: 1.35vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4.8vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 3.5vw;
	}

	@media (min-width: 2000px) {
		font-size: 27px;
	}

	.heart-icon {
		font-size: 2vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 6vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 4.5vw;
		}

		@media (min-width: 2000px) {
			font-size: 40px;
		}
	}
`;

const P_Header = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Bold', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	font-size: 1vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.5vw;
	}

	@media (min-width: 2000px) {
		font-size: 20px;
	}
`;

const P_Copyright = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Regular', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	font-size: 1.125vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.5vw;
	}

	@media (min-width: 2000px) {
		font-size: 22.5px;
	}

	.copyright-icon {
		font-size: 1.05vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.9vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2.4vw;
		}

		@media (min-width: 2000px) {
			font-size: 21px;
		}
	}
`;

const P_Navigation = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	font-size: 0.90vw;
	color: #fff;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 3.25vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		font-size: 18px;
	}
`;

const P_Trademark = styled(Paragraph)<TypographyProps>`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	font-size: 0.45vw;
	color: #8383837b;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 1.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 1vw;
	}

	@media (min-width: 2000px) {
		font-size: 12px;
	}
`;

export const Typography = ({
	variant = 'footer',
	children = ''
}: TypographyProps) => {
	switch (variant) {
	case 'h0':
		return <H0>{ children }</H0>;
	case 'h1':
		return <H1>{ children }</H1>;
	case 'h2':
		return <H2>{ children }</H2>;
	case 'h3':
		return <H3>{ children }</H3>;
	case 'h4':
		return <H4>{ children }</H4>;
	case 'p':
		return <P>{ children }</P>;
	case 'project_header':
		return <H1_ProjectHeader>{ children }</H1_ProjectHeader>;
	case 'project_desc':
		return <P_Project>{ children }</P_Project>;
	case 'project_desc_bold':
		return <P_Project_Bold>{ children }</P_Project_Bold>;
	case 'header':
		return <P_Header>{ children }</P_Header>;
	case 'footer':
		return <P_Footer>{ children }</P_Footer>;
	case 'copyright':
		return <P_Copyright>{ children }</P_Copyright>;
	case 'navigation':
		return <P_Navigation>{ children }</P_Navigation>;
	case 'trademark':
		return <P_Trademark>{ children }</P_Trademark>;
	}
};
