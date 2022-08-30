import React, { createContext, FC, ReactNode, useMemo } from 'react';
import { Store } from './store';

export const StoreContext = createContext<Store | null>(null);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const store = useMemo(() => new Store(), []);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
