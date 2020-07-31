import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as MovieListModuleCss } from './MovieList.module.css';
import { MovieStore } from '../../stores/MovieStore';
import { useMovieStore } from '../../stores/hooks';
import { IMovie } from '../../models/IMovie';
import MovieItem from '../MovieItem/MovieItem';
import { observer } from 'mobx-react-lite';

const block = bemCssModules(MovieListModuleCss);

const MovieList = observer((): JSX.Element => {
	const [ searchResults, setSearchResults ]: [IMovie[], Function] = React.useState([]);
	const {
		results,
		searchQuery,
	}: MovieStore = useMovieStore();

	React.useEffect(() => { setSearchResults(results); }, [ results, searchQuery ]);
	return (
		<div className={block()}>
			{searchResults.map((item: IMovie, index: number) => <MovieItem movie={item} key={index} />)}
		</div>
	);
});

export default MovieList;
