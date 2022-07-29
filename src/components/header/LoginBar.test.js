import {render} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import rootReducer from '../../store/reducer';
import LoginBar from './LoginBar';

describe('Test LoginBar component', () => {
  it('LoginBar renders correctly', () => {
    const store = configureStore({reducer: rootReducer});

    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginBar/>
        </BrowserRouter>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
