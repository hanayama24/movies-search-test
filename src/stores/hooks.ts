import React from 'react';
import { StoreContext } from './StoreProvider';
import { RootStore } from './RootStore';

import { MovieStore } from './MovieStore';

const getRootStore = (): RootStore => {
	const rootStore = React.useContext(StoreContext);
	if (!rootStore) {
		throw new Error('Missing RootStore provider');
	}
	return rootStore;
};

export const useMovieStore = (): MovieStore => {
	const rootStore = getRootStore();
	return rootStore.movieStore;
};
