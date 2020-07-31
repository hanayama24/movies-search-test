import React from 'react';
// tslint:disable
import { throttle } from 'lodash';

import { default as bemCssModules } from 'bem-css-modules';
import { default as SearchInputModuleCss } from './SearchInput.module.css';
import { useMovieStore } from '../../stores/hooks';
import { MovieStore } from '../../stores/MovieStore';
import { observer } from 'mobx-react-lite';

const block = bemCssModules(SearchInputModuleCss);

const THROTTLE_DELAY = 500;
const MIN_CHARACTERS_COUNT = 3;

const SearchInput = observer((): JSX.Element => {
	const [ inputValue, setInputValue ]: [string, Function] = React.useState('');
	const {
		results,
		totalResults,
		searchMovies,
		setSearchQuery,
		resetSearchResults,
	}: MovieStore = useMovieStore();

	const handlerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchQuery(value);
		setInputValue(value);

		if ((value.length > MIN_CHARACTERS_COUNT) && (value[ value.length - 1 ] !== ' ')) {
			const decodedValueForUrl = value.replace(' ', '+');
			await searchMovies(decodedValueForUrl);
		}

		if (!value.length) {
			resetSearchResults();
		}
	};

	const handleInputThrottled = throttle(handlerChange, THROTTLE_DELAY);

	const renderTotalResults = (): JSX.Element | null => {
		if (!results.length) {
			return null;
		}
		return (<span className={block('total-results')}> Found {totalResults} movies</span>);
	};

	return (
		<div className={block()}>
			<input
				className={block('input')}
				type="text"
				placeholder="Search movie"
				onChange={handleInputThrottled}
				value={inputValue}
			/>
			{renderTotalResults()}
		</div>
	);
});

export default SearchInput;
