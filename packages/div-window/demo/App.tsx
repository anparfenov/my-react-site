import React from 'react';
import { DivWindow } from '../lib/DivWindow';

function App() {
	return (
		<div className="App">
			<DivWindow initPos={{ top: 0, left: 0 }} title="div window" />
		</div>
	);
}

export default App;
