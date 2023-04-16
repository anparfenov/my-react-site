import React, { FC, useState, FormEvent, KeyboardEvent } from 'react';
import { css } from '@linaria/core';
import { execute } from './engine';

type TerminalProps = {
	config?: object;
};

// TODO: styles
const style = {
	terminal: css`
		display: flex;
		flex-flow: column nowrap;
	`,
	currentLine: css``,
};

type Line = {
	content: string;
};

type TerminalState = {
	currentLine: number;
	lines: Line[];
};

type Search = {
	input: string;
};

export const Terminal: FC<TerminalProps> = () => {
	const [lines, setLines] = useState<Line[]>([]);
	const [currentLine, setCurrentLine] = useState('');

	function handleInput(ev: FormEvent) {
		const element = ev.target as HTMLInputElement;
		setCurrentLine(element.value);
	}

	async function handleKeyDown(ev: KeyboardEvent) {
		const element = ev.target as HTMLInputElement;
		if (ev.key === 'Enter') {
			const res = await execute(element.value);
			const contentRes = res.map((r) => ({content: r}));
			setLines([...lines, ...contentRes]);
		} else {
			setCurrentLine(element.value);
		}
	}

	return (
		<div className={style.terminal}>
			{lines.map((line, i) => (
				<div key={i}>{line.content}</div>
			))}
			<input
				type="text"
				className={style.currentLine}
				onInput={handleInput}
				value={currentLine}
				onKeyDown={handleKeyDown}
			></input>
		</div>
	);
};
