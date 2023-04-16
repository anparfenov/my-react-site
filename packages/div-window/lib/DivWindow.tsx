import React, { FC, useEffect, useRef, useState, ReactEventHandler } from 'react';
import { useMover, useResizer } from './useWindow';
import './div-window.css';

type DivWindowProps = {
	initPos: {top: number, left: number};
	title: string;
	closeWindow: ReactEventHandler;
};

// TODO
export const DivWindow: FC<DivWindowProps> = ({ initPos, title, closeWindow }) => {
	const frame = useRef<HTMLDivElement | null>(null);
	const titlebar = useRef<HTMLDivElement | null>(null);
	const [frameEl, setFrameEl] = useState<HTMLDivElement | null>(null);
	const [titlebarEl, setTitlebarEl] = useState<HTMLDivElement | null>(null);

	const frameActiveClass = 'window--active';
	const windowMaxClass = 'window--max';

	const {
		handleMouseDownBottom,
		handleMouseDownBottomLeft,
		handleMouseDownBottomRight,
		handleMouseDownLeft,
		handleMouseDownRight,
		handleMouseDownTop,
		handleMouseDownTopLeft,
		handleMouseDownTopRight,
	} = useResizer(frameEl, initPos);

	const { handleTitleBarMouseDown } = useMover(frameEl, titlebarEl, initPos);

	let memWidth = 'auto';
	let memHeight = 'auto';
	let memTransform = '';

	// TODO move to other file
	function maximizeWindow() {
		if (frame.current) {
			frame.current?.classList.toggle(windowMaxClass);

			if (frame.current?.classList.contains(windowMaxClass)) {
				memWidth = frame.current?.style.width;
				memHeight = frame.current?.style.height;
				memTransform = frame.current?.style.transform;

				frame.current.style.width = 'auto';
				frame.current.style.height = 'auto';
				frame.current.style.transform = 'none';
				frame.current.style.top = 0 + 'px';
				frame.current.style.left = 0 + 'px';
				frame.current.style.right = 0 + 'px';
				frame.current.style.bottom = 0 + 'px';
			} else {
				frame.current.style.width = memWidth;
				frame.current.style.height = memHeight;
				frame.current.style.transform = memTransform;
			}
		}
	}

	useEffect(() => {
		setFrameEl(frame.current);
		setTitlebarEl(titlebar.current);
		if (frame.current) {
			frame.current.style.top = initPos.top + 'px';
			frame.current.style.left = initPos.left + 'px';
			// TODO: do i need this?
			frame.current.classList.add(frameActiveClass);
			if (initPos.top > window.innerWidth - frame?.current?.clientWidth) {
				initPos.left = 0;
			}
			if (initPos.top > window.innerHeight - frame?.current?.clientHeight) {
				initPos.left = 0;
			}
		}
	}, []);

	return (
		<div ref={frame} className="window">
			<div className="window__top window__border" onMouseDown={handleMouseDownTop}/>
			<div className="window__bottom window__border" onMouseDown={handleMouseDownBottom} />
			<div className="window__left window__border" onMouseDown={handleMouseDownLeft} />
			<div className="window__right window__border" onMouseDown={handleMouseDownRight} />
			<div
				className="window__top-right window__border window__border--small"
				onMouseDown={handleMouseDownTopRight}
			/>
			<div
				className="window__top-left window__border window__border--small"
				onMouseDown={handleMouseDownTopLeft}
			/>
			<div
				className="window__bottom-right window__border window__border--small"
				onMouseDown={handleMouseDownBottomRight}
			/>
			<div
				className="window__bottom-left window__border window__border--small"
				onMouseDown={handleMouseDownBottomLeft}
			/>
			<div ref={titlebar} className="window__titlebar" onMouseDown={handleTitleBarMouseDown}>
				<h2 className="window__title">{ title }</h2>
				<span className="window__controls">
					<button
						className="window__button window__button--maximize"
						aria-label="maximize"
						onClick={maximizeWindow}
					/>
					<button
						className="window__button window__button--close"
						aria-label="close"
						onClick={closeWindow}
					/>
				</span>
			</div>
			<div className="window__content">
				<slot />
			</div>
		</div>
	);
};
