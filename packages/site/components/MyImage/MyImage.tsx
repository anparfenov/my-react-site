import Image from 'next/image';
import React, { FC } from 'react';

import style from './MyImage.module.css';

export type MyImageType = {
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
	isNextImage?: boolean;
};

type MyImageProps = MyImageType;

// TODO: fix gray `fields`
export const MyImage: FC<MyImageProps> = ({
	src,
	alt,
	width,
	height,
	isNextImage = false,
}) => {
	if (src) {
		let image = (
			<picture className={style.MyImagePicture}>
				<img className={style.MyImageElement} src={src} alt={alt} width={width} height={height} />
			</picture>
		);
		if (isNextImage) {
			image = (
				<Image
					className={style.MyImageElement}
					src={src}
					alt={alt ?? ''}
					width={width}
					height={height}
				/>
			);
		}
		return <div className={style.MyImage}>{image}</div>;
	}
	return <div className={style.MyImagePlaceholder}></div>;
};
