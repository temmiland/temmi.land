/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Link from '../../util/Link';
import Typography from '../../util/Typography';

const Ul = styled.ul`
	list-style: none;
	display: inline-flex;
	gap: 3.47vw;
	margin: 0 0 0 0;
	height: inherit;
	place-items: center;

	.ant-typography {
		margin-bottom: 0 !important;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 4vw;
		width: 500px;
		height: 10vw;
		margin-left: 5vw;
	}

	@media (min-width: 2000px) {
		gap: 69px;
	}
`;

type PageCardListProps = {
	pages: Array<Page>
}

export const PageCardList = ({ pages }: PageCardListProps) => (
	<Ul>
		{
			pages.map((page, i) => (
				<Link key={ i } href={ page.href }>
					<Typography variant={ 'header' } >
						<li style={ {
							position: 'relative',
							cursor: 'pointer'
						} }>
							{ page.name }
						</li>
					</Typography>
				</Link>
			))
		}
	</Ul>
);
