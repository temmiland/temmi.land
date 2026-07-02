/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import PrivacyContent from '../../widgets/PrivacyContent';
import Trail from '../../components/util/Trail';

const PrivacyContainer = styled.div`
	.privacy-header {
		margin: 3.5vw 6.5vw 2.5vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 3.5vw 6.5vw 10vw;
		}
		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 3.5vw 6.5vw 7.5vw;
		}
	}
`;

const PrivacyContentContainer = styled.div`
	margin: 3vw 7vw;
`;

export const Privacy = () => (
	<PrivacyContainer>
		<Trail
			animationDirection={ 'left' }
			animationSpeed={ 50 }
		>
			<div className={ 'privacy-header' }>
				<Typography variant={ 'h1' }>
					{ 'Privacy' }
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'fingerprint'] } />
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'shield-halved'] } />
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'lock'] } />
				</Typography>
			</div>
		</Trail>
		<Trail
			animationDirection={ 'left' }
			animationSpeed={ 50 }
			animationDelay={ 175 }
		>
			<PrivacyContentContainer>
				<PrivacyContent />
			</PrivacyContentContainer>
		</Trail>
	</PrivacyContainer>
);
