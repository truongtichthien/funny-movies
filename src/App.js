import React from 'react';
import {Routes, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/reducer';
import rootSaga from './store/saga';
import Home from './components/home/Home';
import Share from './components/share/Share';
import AppSkeleton from './components/app/AppSkeleton';
import Header from './components/header';
import './App.css';
import cls from './components/app/AppSkeleton.module.scss';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({thunk: false}).prepend(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

const MainApp = () => (
  <BrowserRouter>
    <div className={cls.appContainer}>
      <Header/>
      <AppSkeleton>
        <Routes>
          <Route exact path={'/'} element={<Home/>}/>
          <Route path={'/share'} element={<Share/>}/>
          {/*<Route element={<AppNotFound/>}/>*/}
        </Routes>
      </AppSkeleton>
    </div>
  </BrowserRouter>
);

export default () => (
  <Provider store={store}>
    <MainApp/>
  </Provider>
);
