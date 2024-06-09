import Image from 'next/image';
import React, { FC } from 'react';
import type { MyImageType } from "@features/image/image";

import style from './MyImage.module.css';

type MyImageProps = MyImageType;

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
