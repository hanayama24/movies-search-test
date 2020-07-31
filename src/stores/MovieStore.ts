import { action, observable, runInAction } from 'mobx';
import { default as axios } from 'axios';
import { IAjaxResponse } from '../models/IAjaxResponse';
import { ISearch } from '../dtos/ISearch';
import { IMovie } from '../models/IMovie';
import { IMovieFull } from '../models/IMovieFull';

export class MovieStore {
	@observable
	results: IMovie[] = [];

	@observable
	totalResults: string;

	@observable
	movieInfo: IMovieFull;

	@observable
	searchQuery: string = '';

	@action
	setSearchQuery = (query: string): void => {
		this.searchQuery = query;
	}

	@action
	resetSearchResults = (): void => {
		this.results = [];
	}

	@action
	searchMovies = async (search: String): Promise<IAjaxResponse<ISearch> | null> => {
		const url = `http://www.omdbapi.com/?i=tt3896198&apikey=25c00ac4&s=${search}`;

		const response = await axios.get(url);
		const searchResults = response.data as ISearch;
		runInAction((): void => {
			if (searchResults.Response === 'True') {
				this.results = searchResults.Search;
				this.totalResults = searchResults.totalResults;
			}
		});
		return null;
	}

	@action
	getMovieByImdbId = async (imdbId: string): Promise<IAjaxResponse<IMovieFull> | null> => {
		const url = `http://www.omdbapi.com/?apikey=25c00ac4&i=${imdbId}`;

		const response = await axios.get(url);
		const movieFullInfo = response.data as IMovieFull;

		runInAction((): void => {
			if (movieFullInfo.Response === 'True') {
				this.movieInfo = movieFullInfo;
			}
		});
		return null;
	}

}
