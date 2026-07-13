/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import MadeWithLoveInLeipzig from '@/features/footer/MadeWithLoveInLeipzig';
import CopyrightNotice from '@/features/footer/CopyrightNotice';
import Navigation from '@/features/footer/Navigation';
import Trademark from '@/features/footer/Trademark';

export const FooterContent = () => (
	<>
		<MadeWithLoveInLeipzig />
		<CopyrightNotice />
		<Navigation />
		<Trademark />
	</>
);
