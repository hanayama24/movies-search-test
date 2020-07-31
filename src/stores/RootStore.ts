import { RouterStore } from 'mobx-react-router';
import { MovieStore } from './MovieStore';

export interface IRootStore {
	rootStore: RootStore;
}

export class RootStore {
	public readonly routerStore: RouterStore;
	public readonly movieStore: MovieStore;

	constructor() {
		this.routerStore = new RouterStore();
		this.movieStore = new MovieStore();
	}
}
