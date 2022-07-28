import {ACTION_TYPE} from '../constants';

export const login = ({username, password}) => ({
  type: ACTION_TYPE.LOG_IN,
  payload: {username, password}
});

export const loginSuccess = ({authenticated, user, token}) => ({
  type: ACTION_TYPE.LOG_IN_SUCCESS,
  payload: {authenticated, user, token}
});

export const loginError = () => ({
  type: ACTION_TYPE.LOG_IN_ERROR
});

export const logout = () => ({
  type: ACTION_TYPE.LOG_OUT
});
