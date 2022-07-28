import {combineReducers} from 'redux';
import {ACTION_TYPE} from '../constants';

const createReducer = (initialState, handlers) => (state = initialState, action) => (Object.prototype.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state);

const loggedIn = 'loggedIn';
const currentUser = 'currentUser';
const loading = 'loading';

const initialState = {
  [loggedIn]: false,
  [currentUser]: {}
};

const handlersAuth = {
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

const authReducer = createReducer(initialAuth, handlersAuth);

// ~~~~~

const list = 'list';

const initialVideo = {
  [list]: {},
  [loading]: false
};

const handlersVideo = {
  [ACTION_TYPE.GET_VIDEOS_LOADING]: (state, {status}) => {
    return {...state, [loading]: status};
  },
  [ACTION_TYPE.GET_VIDEOS_SUCCESS]: (state, {videos}) => {
    return {...state, [loading]: false, list: videos.reduce((acc, ele) => ({...acc, [ele.id]: {...ele}}), {})};
  },
  [ACTION_TYPE.GET_VIDEOS_ERROR]: (state) => {
    return state;
  }
};

const videosReducer = createReducer(initialVideo, handlersVideo);

export default combineReducers({authentication: authReducer, videos: videosReducer});
