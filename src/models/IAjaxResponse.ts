import { AxiosError } from 'axios';

export interface IAjaxResponse<T> {
	data?: T;
	error?: AxiosError;
}
