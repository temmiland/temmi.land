/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Typography } from '../../util/Typography/Typography.tsx';

const Div_Trademark = styled.div`
	.ant-typography {
		margin: 0.5vw 0.6vw;

		@media (min-width: 2000px) {
			margin: 10px 12px;
		}
	}
`;

export const Trademark = () => (
	<Div_Trademark>
		<Typography variant={ 'trademark' }>
			{
				'The logos and trademarks used on this website are the'
				+ ' property of their respective owners. I do not claim'
				+ ' any rights to these images and use them solely for'
				+ ' reference purposes.'
			}
		</Typography>
		<Typography variant={ 'trademark' }>
			{
				'All rights to the logos belong'
				+ ' to their respective brand owners. If there are any'
				+ ' concerns or questions regarding the use of these logos'
				+ ', please contact me directly.'
			}
		</Typography>

	</Div_Trademark>
);
