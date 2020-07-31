import { IMovie } from '../models/IMovie';

export interface ISearch {
	Search: IMovie[];
	totalResults: string;
	Response: string;
}
