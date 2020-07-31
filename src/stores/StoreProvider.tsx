import React from 'react';
import { RootStore } from './RootStore';

export const StoreContext = React.createContext<RootStore | null>(null);
StoreContext.displayName = 'RootStore';

interface IStoreProviderProps {
	children: React.ReactNode;
}

export const StoreProvider: React.FC<IStoreProviderProps> = (
	props: IStoreProviderProps
): JSX.Element => (
	<StoreContext.Provider value={new RootStore()}>
		{props.children}
	</StoreContext.Provider>
);
