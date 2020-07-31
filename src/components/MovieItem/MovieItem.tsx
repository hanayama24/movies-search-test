import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as MovieItemModuleCss } from './MovieItem.module.css';
import { IMovie } from '../../models/IMovie';
import { Link } from 'react-router-dom';

const block = bemCssModules(MovieItemModuleCss);

interface IMovieItemProps {
	movie: IMovie;
}

const MovieItem = ({ movie }: IMovieItemProps): JSX.Element => {
	const renderPoster = (): JSX.Element => {
		if (movie.Poster === 'N/A') {
			return (
				<div className={block('poster-noimage')}>
					<span> N/A </span>
				</div>
			);
		}

		return (<img src={movie.Poster} />);
	};

	return (
		<Link to={`/movies/${movie.imdbID}`} className={block()}>
			<div className={block('poster')}>
				{renderPoster()}
			</div>
			<h3 className={block('title')}> {movie.Year}, {movie.Title} </h3>
		</Link>
	);
};

export default MovieItem;
