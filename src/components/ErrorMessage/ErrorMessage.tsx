import * as React from 'react';
import { AxiosError } from 'axios';

import { default as ErrorMessageModuleCss } from './ErrorMessage.module.css';
import { default as bemCssModules } from 'bem-css-modules';

const block = bemCssModules(ErrorMessageModuleCss);

export interface IErrorMessageProps {
	error?: AxiosError | Error;
	isStandalone?: boolean;
}

export const ErrorMessage =
	React.memo<IErrorMessageProps>(({ error, isStandalone }): JSX.Element | null => {

		if (!error) {
			return null;
		}

		return (
			<div className={block('', isStandalone ? { standalone: true } : {})}>
				<h2> Something wrong .... </h2>
			</div>
		);

	});
