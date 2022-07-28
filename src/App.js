import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/header';
import './App.css';
import cls from './components/app/AppSkeleton.module.scss';

export default () => (
  <BrowserRouter>
    <div className={cls.appContainer}>
      <Header/>
    </div>
  </BrowserRouter>
);
