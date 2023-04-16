import clsx from 'clsx';
import React, { CSSProperties, FC, ReactNode } from 'react';
import style from './Chip.module.css';

type ChipProps = {
	children: ReactNode;
	className?: string;
	color?: string;
	bgColor?: string;
};

export const Chip: FC<ChipProps> = ({
	children,
	className,
	color,
	bgColor,
}) => {
	return (
		<div
			style={
				{
					'--chip-color': color,
					'--chip-bgcolor': bgColor,
				} as CSSProperties
			}
			className={clsx(style.Chip, className)}
		>
			{children}
		</div>
	);
};
