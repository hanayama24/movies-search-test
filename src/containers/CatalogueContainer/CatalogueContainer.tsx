import * as React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieList from '../../components/MovieList/MovieList';

export const CatalogueContainer: React.FunctionComponent = (): JSX.Element => (
	<React.Fragment>
		<SearchInput />
		<MovieList />
	</React.Fragment>
);
