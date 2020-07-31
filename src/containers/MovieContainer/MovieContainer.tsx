import * as React from 'react';
// tslint:disable
import { default as bemCssModules } from 'bem-css-modules';
import { default as MovieContainerModuleCss } from './MovieContainer.module.css';
import { MovieStore } from '../../stores/MovieStore';
import { useMovieStore } from '../../stores/hooks';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { observer } from 'mobx-react-lite';

const block = bemCssModules(MovieContainerModuleCss);

const MovieContainer: React.FunctionComponent = observer((): JSX.Element | null => {
	const [ isLoaded, setIsLoaded ]: [boolean, Function] = React.useState(false);
	const { movieImdbId } = useParams();

	const {
		movieInfo,
		getMovieByImdbId,
	}: MovieStore = useMovieStore();

	useAsyncEffect(async () => {
		await getMovieByImdbId(movieImdbId);
		setIsLoaded(true);
	}, []);

	// eslint-disable-next-line
	if (!isLoaded) {
		return null;
	}

	const renderPoster = (): JSX.Element => {
		if (movieInfo.Poster === 'N/A') {
			return (
				<div className={block('poster-noimage')}>
					<span> N/A </span>
				</div>
			);
		}

		return (<img src={movieInfo.Poster} alt="poster" />);
	};

	const renderMovieDescription = (): JSX.Element => (
			<div className={block('info')}>
				<div className={block('poster')}>
					{renderPoster()}
				</div>
				<div className={block('description')}>
					<p>
						<span className={block('description-title')}> Title: </span>
						<span className={block('description-text')}> {movieInfo.Title} </span>
					</p>
					<p>
						<span className={block('description-title')}> Year: </span>
						<span className={block('description-text')}> {movieInfo.Year} </span>
					</p>
					<p>
						<span className={block('description-title')}> Country: </span>
						<span className={block('description-text')}> {movieInfo.Country} </span>
					</p>
					<p>
						<span className={block('description-title')}> Awards: </span>
						<span className={block('description-text')}> {movieInfo.Awards} </span>
					</p>
					<p>
						<span className={block('description-title')}> Box Office: </span>
						<span className={block('description-text')}> {movieInfo.BoxOffice} </span>
					</p>
					<p>
						<span className={block('description-title')}> Director: </span>
						<span className={block('description-text')}> {movieInfo.Director} </span>
					</p>
					<p>
						<span className={block('description-title')}> Actors: </span>
						<span className={block('description-text')}> {movieInfo.Actors} </span>
					</p>
					<p>
						<span className={block('description-title')}> Type: </span>
						<span className={block('description-text')}> {movieInfo.Type} </span>
					</p>

					<p>
						<span className={block('description-title')}> Description: </span>
						<span className={block('description-text')}> {movieInfo.Plot} </span>
					</p>
				</div>
			</div>
		);

	return (
		<div className={block()}>
			{renderMovieDescription()}
		</div>
	);
});

export default MovieContainer;
