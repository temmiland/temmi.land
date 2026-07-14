/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '@/ui/Typography';
import Chip from '@/features/me/Chip';
import LinkIcon from '@/ui/LinkIcon';
import Signature from '@/features/me/Signature';
import { colors, fluid, media } from '@/styles';

const MeTextContainer = styled.div`
	z-index: 100;
	text-align: center;

	h1 {
		margin: 0 0 0 -2.75vw;

		${media.belowDesktop} {
			margin: 0;
		}

		${media.wide} {
			margin: 0 0 0 -55px;
		}
	}

	h2 {
		line-height: ${fluid(4)};

		${media.belowDesktop} {
			line-height: 9.25vw;
		}

		span {
			isolation: isolate;
		}

		.stack-break {
			display: none;

			${media.belowDesktop} {
				display: block;
			}
		}
	}

	.signature {
		position: relative;
		top: ${fluid(0.25)};
		left: 1.75vw;
		scale: 1;

		${media.belowDesktop} {
			top: 2vw;
			left: 0;
		}

		${media.wide} {
			left: 40px;
		}
	}
`;

const MeLinkIconContainer = styled.div`
	display: flex;
	margin: 2.25vw auto;
	width: 50%;
	justify-content: space-evenly;

	${media.belowDesktop} {
		margin: 5.5vw auto;
	}

	${media.wide} {
		margin: 45px auto;
	}
`;

export const MeInfo = () => (
	<MeTextContainer id={'hero-heading'}>
		<Typography variant={'h0'}>
			{"Hi, I'm"}
			<Signature />
		</Typography>
		<Typography variant={'h2'}>
			{"I'm a "}
			<Chip color={colors.accentBlue} iconName={'mug-hot'} text={'Senior Developer'} />
			{' based in '}
			<br className={'stack-break'} />
			<Chip color={colors.accentPink} iconName={'location-dot'} text={'Leipzig, Germany'} />
		</Typography>
		<MeLinkIconContainer>
			<LinkIcon
				href={'https://www.linkedin.com/in/temmi-pietsch/'}
				hoverColor={colors.accentBlue}
				icon={{
					prefix: 'fab',
					iconName: 'linkedin'
				}}
				size={3}
			/>
			<LinkIcon
				href={'https://github.com/temmiland'}
				hoverColor={colors.accentPink}
				icon={{
					prefix: 'fab',
					iconName: 'github'
				}}
				size={3}
			/>
		</MeLinkIconContainer>
	</MeTextContainer>
);
