import React from 'react';
import PropTypes from 'prop-types';
import cls from './AppSkeleton.module.scss';

const AppSkeleton = ({children}) => (
  <main className={cls.appMain}>
    {children}
  </main>
);

AppSkeleton.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppSkeleton;
