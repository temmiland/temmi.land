/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@/ui/Typography';
import PrivacyContent from '@/features/privacy/PrivacyContent';
import Trail from '@/ui/Trail';
import { fluidRange, media } from '@/styles';

const PrivacyContainer = styled.div`
	.privacy-header {
		margin: 3.5vw 6.5vw 2.5vw;

		${media.belowDesktop} {
			margin: ${fluidRange(11.2, 35.84)} ${fluidRange(20.8, 66.56)} ${fluidRange(35.29, 72.63)};
		}
	}
`;

const PrivacyContentContainer = styled.div`
	margin: 3vw 7vw;
`;

export const PrivacySection = () => (
	<PrivacyContainer>
		<Trail animationDirection={'left'} animationSpeed={50}>
			<div className={'privacy-header'}>
				<Typography variant={'h1'}>
					{'Privacy'}
					<FontAwesomeIcon className={'h-icon'} icon={['fas', 'fingerprint']} />
					<FontAwesomeIcon className={'h-icon'} icon={['fas', 'shield-halved']} />
					<FontAwesomeIcon className={'h-icon'} icon={['fas', 'lock']} />
				</Typography>
			</div>
		</Trail>
		<Trail animationDirection={'left'} animationSpeed={50} animationDelay={175}>
			<PrivacyContentContainer>
				<PrivacyContent />
			</PrivacyContentContainer>
		</Trail>
	</PrivacyContainer>
);
