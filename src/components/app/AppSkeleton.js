import React from 'react';
import PropTypes from 'prop-types';
import cls from './AppSkeleton.module.scss';

const AppSkeleton = ({children}) => (
  <div className={cls.appMain}>
    {children}
  </div>
);

AppSkeleton.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppSkeleton;
