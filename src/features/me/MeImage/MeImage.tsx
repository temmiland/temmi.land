/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */


/**
 * MeImage component.
 * @param {MeImageProps} props - The props for the MeImage component.
 * @returns {JSX.Element} MeImage JSX element.
 */
export const MeImage = (): JSX.Element => (
	<img
		width={ '100%' }
		src={ './me.png' }
		alt={ 'me' }
	/>
);