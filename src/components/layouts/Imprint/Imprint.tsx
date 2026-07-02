/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import ImprintContent from '../../widgets/ImprintContent';
import Trail from '../../components/util/Trail';

const ImprintContainer = styled.div`
	.imprint-header {
		margin: 3.5vw 6.5vw 2.5vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 3.5vw 6.5vw 10vw;
		}
		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 3.5vw 6.5vw 7.5vw;
		}
	}
`;

const ImprintContentContainer = styled.div`
	margin: 3vw 7vw;
`;

export const Imprint = () => (
	<ImprintContainer>
		<Trail
			animationDirection={ 'left' }
			animationSpeed={ 50 }
		>
			<div className={ 'imprint-header' }>
				<Typography variant={ 'h1' }>
					{ 'Imprint' }
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'gavel'] }/>
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'scale-balanced'] }/>
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'section'] }/>
				</Typography>
			</div>
		</Trail>
		<Trail
			animationDirection={ 'left' }
			animationSpeed={ 50 }
			animationDelay={ 175 }
		>
			<ImprintContentContainer>
				<ImprintContent />
			</ImprintContentContainer>
		</Trail>
	</ImprintContainer>
);
