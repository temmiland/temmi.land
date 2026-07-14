/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import ImprintSection from '@/features/imprint/ImprintSection';
import Header from '@/features/header/Header';
import PageLayout from '@/ui/PageLayout';
import { colors, media } from '@/styles';

const ImprintArea = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 15vw 6vw;
	position: relative;
	background: ${colors.surface};

	${media.mobile} {
		padding: 22.6vw 2vw 60vw 2vw;
	}

	${media.tablet} {
		padding: 11.25vw 1.5vw 37.5vw 1.5vw;
	}
`;

export default function Imprint() {
	return (
		<PageLayout header={<Header animationDirection={'left'} />}>
			<ImprintArea>
				<ImprintSection />
			</ImprintArea>
		</PageLayout>
	);
}
