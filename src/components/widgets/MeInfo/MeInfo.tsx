/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../components/util/Typography';
import Chip from '../../components/me/Chip';
import LinkIcon from '../../components/util/LinkIcon';
import Signature from '../../components/me/Signature';

const MeTextContainer = styled.div`
	z-index: 100;
	text-align: center;

	h1 {
		margin: 0 0 0 -2.75vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			margin: 0;
		}

		@media (min-width: 2000px) {
			margin: 0 0 0 -55px;
		}
	}

	h2 {
		line-height: 4vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			line-height: 9.25vw;
		}

		@media (min-width: 2000px) {
			line-height: 80px;
		}

		span {
			isolation: isolate;
		}
	}

	.signature {
		position: relative;
		top: 0.25vw;
		left: 1.75vw;
		scale: 1;

		@media (min-width: 320px) and (max-width: 1024px) {
			top: 2vw;
			left: 0;
		}

		@media (min-width: 2000px) {
			top: 5px;
			left: 40px;
		}
	}
`;

const MeLinkIconContainer = styled.div`
	display: flex;
	margin: 2.25vw auto;
	width: 50%;
	justify-content: space-evenly;

	@media (min-width: 320px) and (max-width: 1024px) {
		margin: 5.5vw auto;
	}

	@media (min-width: 2000px) {
		margin: 45px auto;
	}
`;

export const MeInfo = () => (
	<MeTextContainer>
		<Typography variant={ 'h0' }>
			{ 'Hi, I\'m' }
			<Signature />
		</Typography>
		<Typography variant={ 'h2' }>
			{ 'I\'m a ' }
			<Chip color={ '#80cee1' } iconName={ 'mug-hot' } text={ 'Frontend Developer' }/>
			{ ' based in ' }
			<Chip
				color={ '#d698a1' }
				iconName={ 'location-dot' }
				text={ 'Dresden, Germany' }
			/>
		</Typography>
		<MeLinkIconContainer>
			<LinkIcon
				href={ 'https://www.linkedin.com/in/temmi-pietsch/' }
				hoverColor={ '#80cee1' }
				icon={ {
					prefix: 'fab',
					iconName: 'linkedin'
				} }
				size={ 3 }
			/>
			<LinkIcon
				href={ 'https://github.com/temmiland' }
				hoverColor={ '#d698a1' }
				icon={ {
					prefix: 'fab',
					iconName: 'github'
				} }
				size={ 3 }
			/>
		</MeLinkIconContainer>
	</MeTextContainer>
);
