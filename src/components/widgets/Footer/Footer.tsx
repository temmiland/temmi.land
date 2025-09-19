/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import MadeWithLoveInDresden
	from '../../components/footer/MadeWithLoveInDresden';
import CopyrightNotice from '../../components/footer/CopyrightNotice';
import Navigation from '../../components/footer/Navigation';
import Trademark from '../../components/footer/Trademark';

export const Footer = () => (
	<>
		<MadeWithLoveInDresden />
		<CopyrightNotice />
		<Navigation />
		<Trademark />
	</>
);
