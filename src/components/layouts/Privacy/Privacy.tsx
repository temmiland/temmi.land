/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import PrivacyContent from '../../widgets/PrivacyContent';
import Trail from '../../components/util/Trail';

const PrivacyContainer = styled.div`
	.privacy-header {
		margin: 3.5vw 6.5vw 10vw 6.5vw;
	}
`;

const PrivacyContentContainer = styled.div`
	margin: 3vw 7vw;
`;

export const Privacy = () => {

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollY(document.body.scrollTop), true);
	});

	return (
		<PrivacyContainer>
			<Trail
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: Infinity,
						tablet: Infinity,
						desktop: Infinity,
						oversize: Infinity
					}
				} }
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
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: Infinity,
						tablet: Infinity,
						desktop: Infinity,
						oversize: Infinity
					}
				} }
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
}
