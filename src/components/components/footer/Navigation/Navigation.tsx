/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Link } from '../../util/Link/Link.tsx';
import { Typography } from '../../util/Typography/Typography.tsx';

const Div_Navigation = styled.div`
	display: flex;
	justify-content: center;

	p {
		font-size: 10px;
	}

	.ant-typography {
		margin: 0.3vw 0.6vw;

		@media (min-width: 2000px) {
			margin: 6px 12px;
		}
	}
`;

export const Navigation = () => (
	<Div_Navigation>
		<Link href={ '/privacy' }>
			<Typography variant={ 'navigation' }>
				{ 'Privacy' }
			</Typography>
		</Link>
		<Link href={ '/imprint' }>
			<Typography variant={ 'navigation' }>
				{ 'Imprint' }
			</Typography>
		</Link>
	</Div_Navigation>
);
