import { MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { getTranslateXY, clamp } from './utils';

export enum Position {
	Top = 'top',
	Bottom = 'bottom',
	Right = 'right',
	Left = 'left',
	TopRight = 'top-right',
	TopLeft = 'top-left',
	BottomRight = 'bottom-right',
	BottomLeft = 'botton-left',
}
type MoveProps = {
	pos: Position;
	elem: HTMLElement;
	initPos: Coordinates;
	event: MouseEvent;
};

type ResizeProps = {
	frame: HTMLDivElement | null;
	initHeight?: number;
	initWidth?: number;
	deltaX?: number;
	deltaY?: number;
	position?: Position;
	event?: MouseEvent;
	initPos?: Coordinates;
};

export type Coordinates = {
	left: number;
	top: number;
};

export function useResizer(frame: HTMLDivElement | null, initPos: Coordinates) {
	let initWidth = 0;
	let initHeight = 0;
	let cursorX = 0;
	let cursorY = 0;
	let frameBbox: DOMRect | null = null;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	function move({ pos, elem, event, initPos }: MoveProps) {
		if (frame) {
			if (pos === Position.Top) {
				const { translateX } = getTranslateXY(elem);
				frame.style.transform = `translate(
					${clamp(translateX, 0 - initPos.left, windowWidth)}px,
					${clamp(event.pageY - initPos.top, 0 - initPos.top, windowHeight)}px)`;
			} else if (pos === Position.Left) {
				const { translateY } = getTranslateXY(elem);
				frame.style.transform = `translate(
					${clamp(event.pageX - initPos.left, 0 - initPos.left, windowWidth)}px,
					${clamp(translateY, 0 - initPos.top, windowHeight)}px)`;
			}
		}
	}

	function resizeTop({
		frame,
		initHeight = 0,
		deltaY = 0,
		position = Position.Top,
		event,
		initPos = { left: 0, top: 0 },
	}: ResizeProps) {
		if (frame && event && frameBbox) {
			frame.style.height = clamp(initHeight + deltaY, 0, initHeight + frameBbox.top) + 'px';

			move({
				pos: position,
				elem: frame,
				event,
				initPos,
			});
		}
	}

	function resizeBottom({ frame, initHeight = 0, deltaY = 0 }: ResizeProps) {
		if (frame && frameBbox) {
			frame.style.height = clamp(initHeight - deltaY, 0, windowHeight - frameBbox.top) + 'px';
		}
	}

	function resizeLeft({
		frame,
		initWidth = 0,
		deltaX = 0,
		position = Position.Left,
		event,
		initPos = { left: 0, top: 0 },
	}: ResizeProps) {
		if (frame && event && frameBbox) {
			frame.style.width = clamp(initWidth + deltaX, 0, initWidth + frameBbox.left) + 'px';

			move({
				pos: position,
				elem: frame,
				event,
				initPos,
			});
		}
	}

	function resizeRight({ frame, initWidth = 0, deltaX = 0 }: ResizeProps) {
		if (frame && frameBbox) {
			frame.style.width = clamp(initWidth - deltaX, 0, windowWidth - frameBbox.left) + 'px';
		}
	}

	const handleResizeMouseMove = (position: Position) => (e: MouseEvent) => {
		console.log('handleResizeMouseMove', frame);
		const deltaX = cursorX - e.clientX; // distance between cursor and window
		const deltaY = cursorY - e.clientY; // distance between cursor and window

		if (frame) {
			switch (position) {
				case Position.Top:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						initPos,
					});
					break;
				case Position.Bottom:
					resizeBottom({ frame, initHeight, deltaY });
					break;
				case Position.Left:
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						initPos,
					});
					break;
				case Position.Right:
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.TopRight:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						initPos,
					});
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.TopLeft:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						initPos,
					});
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						initPos,
					});
					break;
				case Position.BottomRight:
					resizeBottom({ frame, initHeight, deltaY });
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.BottomLeft:
					resizeBottom({ frame, initHeight, deltaY });
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						initPos,
					});
					break;
				default:
					throw new TypeError('HANDLE_RESIZE_MOUSE_MOVE: no such position');
			}
		}
	};

	/**
	 * We need keep reference to function to remove listener
	 */
	function handleResizeMouseMoveTop(e: MouseEvent) {
		handleResizeMouseMove(Position.Top)(e);
	}
	function handleResizeMouseMoveBottom(e: MouseEvent) {
		handleResizeMouseMove(Position.Bottom)(e);
	}
	function handleResizeMouseMoveLeft(e: MouseEvent) {
		handleResizeMouseMove(Position.Left)(e);
	}
	function handleResizeMouseMoveRight(e: MouseEvent) {
		handleResizeMouseMove(Position.Right)(e);
	}
	function handleResizeMouseMoveTopRight(e: MouseEvent) {
		handleResizeMouseMove(Position.TopRight)(e);
	}
	function handleResizeMouseMoveTopLeft(e: MouseEvent) {
		handleResizeMouseMove(Position.TopLeft)(e);
	}
	function handleResizeMouseMoveBottomRight(e: MouseEvent) {
		handleResizeMouseMove(Position.BottomRight)(e);
	}
	function handleResizeMouseMoveBottomLeft(e: MouseEvent) {
		handleResizeMouseMove(Position.BottomLeft)(e);
	}


	/**
	 * We need keep reference to function to remove listener
	 */
	function handleResizeMouseUpTop() {
		handleResizeMouseUp(Position.Top)();
	}
	function handleResizeMouseUpBottom() {
		handleResizeMouseUp(Position.Bottom)();
	}
	function handleResizeMouseUpLeft() {
		handleResizeMouseUp(Position.Left)();
	}
	function handleResizeMouseUpRight() {
		handleResizeMouseUp(Position.Right)();
	}
	function handleResizeMouseUpTopRight() {
		handleResizeMouseUp(Position.TopRight)();
	}
	function handleResizeMouseUpTopLeft() {
		handleResizeMouseUp(Position.TopLeft)();
	}
	function handleResizeMouseUpBottomRight() {
		handleResizeMouseUp(Position.BottomRight)();
	}
	function handleResizeMouseUpBottomLeft() {
		handleResizeMouseUp(Position.BottomLeft)();
	}

	const handleResizeMouseUp = (position: Position) => () => {
		switch (position) {
			case Position.Top:
				window.removeEventListener('mousemove', handleResizeMouseMoveTop);
				window.removeEventListener('mouseup', handleResizeMouseUpTop);
				break;
			case Position.Bottom:
				window.removeEventListener('mousemove', handleResizeMouseMoveBottom);
				window.removeEventListener('mouseup', handleResizeMouseUpBottom);
				break;
			case Position.Left:
				window.removeEventListener('mousemove', handleResizeMouseMoveLeft);
				window.removeEventListener('mouseup', handleResizeMouseUpLeft);
				break;
			case Position.Right:
				window.removeEventListener('mousemove', handleResizeMouseMoveRight);
				window.removeEventListener('mouseup', handleResizeMouseUpRight);
				break;
			case Position.TopRight:
				window.removeEventListener('mousemove', handleResizeMouseMoveTopRight);
				window.removeEventListener('mouseup', handleResizeMouseUpTopRight);
				break;
			case Position.TopLeft:
				window.removeEventListener('mousemove', handleResizeMouseMoveTopLeft);
				window.removeEventListener('mouseup', handleResizeMouseUpTopLeft);
				break;
			case Position.BottomRight:
				window.removeEventListener('mousemove', handleResizeMouseMoveBottomRight);
				window.removeEventListener('mouseup', handleResizeMouseUpBottomRight);
				break;
			case Position.BottomLeft:
				window.removeEventListener('mousemove', handleResizeMouseMoveBottomLeft);
				window.removeEventListener('mouseup', handleResizeMouseUpBottomLeft);
				break;
			default:
				throw new TypeError('HANDLE_RESIZE_MOUSE_UP: no such position');
		}
	};

	const handleResizeMouseDown = (position: Position) => (e: ReactMouseEvent) => {
		initWidth = frame?.offsetWidth ?? 0;
		initHeight = frame?.offsetHeight ?? 0;
		cursorX = e.clientX;
		cursorY = e.clientY;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		frameBbox = frame?.getBoundingClientRect() ?? null;

		switch (position) {
			case Position.Top:
				window.addEventListener('mousemove', handleResizeMouseMoveTop);
				window.addEventListener('mouseup', handleResizeMouseUpTop);
				break;
			case Position.Bottom:
				window.addEventListener('mousemove', handleResizeMouseMoveBottom);
				window.addEventListener('mouseup', handleResizeMouseUpBottom);
				break;
			case Position.Left:
				window.addEventListener('mousemove', handleResizeMouseMoveLeft);
				window.addEventListener('mouseup', handleResizeMouseUpLeft);
				break;
			case Position.Right:
				console.log('right');
				window.addEventListener('mousemove', handleResizeMouseMoveRight);
				window.addEventListener('mouseup', handleResizeMouseUpRight);
				break;
			case Position.TopRight:
				window.addEventListener('mousemove', handleResizeMouseMoveTopRight);
				window.addEventListener('mouseup', handleResizeMouseUpTopRight);
				break;
			case Position.TopLeft:
				window.addEventListener('mousemove', handleResizeMouseMoveTopLeft);
				window.addEventListener('mouseup', handleResizeMouseUpTopLeft);
				break;
			case Position.BottomRight:
				window.addEventListener('mousemove', handleResizeMouseMoveBottomRight);
				window.addEventListener('mouseup', handleResizeMouseUpBottomRight);
				break;
			case Position.BottomLeft:
				window.addEventListener('mousemove', handleResizeMouseMoveBottomLeft);
				window.addEventListener('mouseup', handleResizeMouseUpBottomLeft);
				break;
			default:
				throw new TypeError('HANDLE_RESIZE_MOUSE_DOWN: no such position');
		}
	};


	return {
		handleMouseDownTop: handleResizeMouseDown(Position.Top),
		handleMouseDownBottom: handleResizeMouseDown(Position.Bottom),
		handleMouseDownLeft: handleResizeMouseDown(Position.Left),
		handleMouseDownRight: handleResizeMouseDown(Position.Right),
		handleMouseDownTopRight: handleResizeMouseDown(Position.TopRight),
		handleMouseDownBottomRight: handleResizeMouseDown(Position.BottomRight),
		handleMouseDownTopLeft: handleResizeMouseDown(Position.TopLeft),
		handleMouseDownBottomLeft: handleResizeMouseDown(Position.BottomLeft),
	};
}

export function useMover(
	frame: HTMLDivElement | null,
	titlebar: HTMLDivElement | null,
	initPos: Coordinates
) {
	const grabbingClass = 'window__titlebar--grabbing';
	const frameActiveClass = 'window--active';
	let titleBarX = 0;
	let titleBarY = 0;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let frameBbox = frame?.getBoundingClientRect() ?? null;

	function handleTitleBarMouseMove(e: MouseEvent) {
		if (frame && frameBbox) {
			const x = e.pageX;
			const y = e.pageY;
			frame.style.transform = `translate(
				${clamp(
					x - titleBarX - initPos.left,
					0 - initPos.left,
					windowWidth - frameBbox.width - initPos.left
				)}px,
				${clamp(
					y - titleBarY - initPos.top,
					0 - initPos.top,
					windowHeight - frameBbox.height - initPos.top
				)}px)`;
		}
	}

	function handleTitleBarMouseDown(e: ReactMouseEvent) {
		if (
			(e.target as HTMLButtonElement).tagName === 'BUTTON' ||
			(e.target as HTMLDivElement).classList.contains('window__controls')
		) {
			return;
		}

		frameBbox = frame?.getBoundingClientRect() ?? null;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		const BBox = titlebar?.getBoundingClientRect() ?? { x: 0, y: 0 };
		titleBarX = e.clientX - BBox.x; // x pos inside titlebar
		titleBarY = e.clientY - BBox.y; // y pos inside titlebar
		titlebar?.classList.add(grabbingClass);

		window.addEventListener('mousemove', handleTitleBarMouseMove);
		window.addEventListener('mouseup', handleTitleBarMouseUp);
	}

	function handleTitleBarMouseUp() {
		titlebar?.classList.remove(grabbingClass);
		window.removeEventListener('mousemove', handleTitleBarMouseMove);
		window.removeEventListener('mouseup', handleTitleBarMouseUp);
	}

	useEffect(() => {
		return () => {
			window.removeEventListener('mousemove', handleTitleBarMouseMove);
			window.removeEventListener('mouseup', handleTitleBarMouseUp);
			if (frame) {
				frame.classList.remove(frameActiveClass);
			}
		};
	});

	return {
		handleTitleBarMouseDown,
	};
}
