import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { AppRoute } from '../../common/const';

import { MainPage } from '../main-page/main-page';
import { PersonPage } from '../person-page/person-page';
import { StoreProvider } from '../../common/store';

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path={AppRoute.ROOT} element={<MainPage />}/>
          <Route path={AppRoute.PERSON} element={<PersonPage />}/>
        </Routes>
      </Router>
    </StoreProvider>
  );
};
