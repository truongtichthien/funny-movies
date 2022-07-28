import {ACTION_TYPE} from '../constants';

const createReducer = (initialState, handlers) => (state = initialState, action) => (Object.prototype.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state);

const loggedIn = 'loggedIn';
const currentUser = 'currentUser';

const initialState = {
  [loggedIn]: false,
  [currentUser]: {}
};
const handlers = {
  [ACTION_TYPE.LOG_IN_SUCCESS]: (state, {payload: {authenticated, user, token}}) => {
    // document.cookie = `fm-access-token=${token};`;
    return {...state, [loggedIn]: authenticated, [currentUser]: {...user, token}};
  },
  [ACTION_TYPE.LOG_IN_ERROR]: (state) => {
    return {...state, [loggedIn]: false, [currentUser]: {}};
  },
  [ACTION_TYPE.LOG_OUT]: (state) => {
    return {...state, [loggedIn]: false, [currentUser]: {}};
  }
};
export default createReducer(initialState, handlers);
