/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import PrivacySection from '@/features/privacy/PrivacySection';
import Header from '@/features/header/Header';
import PageLayout from '@/ui/PageLayout';
import { colors, media } from '@/styles';

const PrivacyArea = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: ${colors.surface};

	${media.mobile} {
		padding: 22.6vw 2vw 60vw 2vw;
	}

	${media.tablet} {
		padding: 15vw 2vw 50vw 2vw;
	}
`;

export default function Privacy() {
	return (
		<PageLayout header={ <Header animationDirection={ 'left' } /> }>
			<PrivacyArea>
				<PrivacySection />
			</PrivacyArea>
		</PageLayout>
	);
}
