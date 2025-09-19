/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '../../util/Typography/Typography.tsx';


export const CopyrightNotice = () => (
	<Typography variant={ 'copyright' }>
		<FontAwesomeIcon className={ 'copyright-icon' } icon={ faCopyright } />
		{ ' ' + new Date().getFullYear() + ' by Temmi Pietsch. All rights reserved.' }
	</Typography>
);
