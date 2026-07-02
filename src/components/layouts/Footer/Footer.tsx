/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import WFooter from '../../widgets/Footer';
import Trail from '../../components/util/Trail';

export const Footer = () => (
	<Trail
		animationDirection={ 'bottom' }
		animationSpeed={ 50 }
	>
		<div>
			<WFooter />
		</div>
	</Trail>
);
