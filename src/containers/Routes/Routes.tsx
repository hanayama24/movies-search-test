import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CatalogueContainer } from '../CatalogueContainer/CatalogueContainer';
import MovieContainer from '../MovieContainer/MovieContainer';

const renderDevTool = (): JSX.Element | null => {
	if (process.env.NODE_ENV !== 'production') {
		// tslint:disable-next-line:no-require-imports
		const DevTools = require('mobx-react-devtools').default;
		return <DevTools />;
	}
	return null;
};

export const Routes = (): JSX.Element => (
		<React.Fragment>
			<Switch>
				<Route exact={true} path="/" component={CatalogueContainer}/>
				<Route path="/movies/:movieImdbId" component={MovieContainer}/>
			</Switch>
			{renderDevTool()}
		</React.Fragment>
);
