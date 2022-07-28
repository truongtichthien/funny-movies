import React from 'react';
import Logo from './Logo';
import LoginBar from './LoginBar';
import cls from './Header.module.scss';

export default () => (
  <header className={cls.appHeader}>
    <div className={cls.headerContainer}>
      <Logo/>
      <LoginBar/>
    </div>
  </header>
);
