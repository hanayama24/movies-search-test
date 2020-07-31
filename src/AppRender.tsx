import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

export const init = (rootEl: HTMLDivElement): void => {
	ReactDOM.render(<App />, rootEl);
};
