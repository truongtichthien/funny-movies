import {render} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import rootReducer from '../../store/reducer';
import Home from './Home';

describe('Test Header component', () => {
  it('Header renders correctly', () => {
    const store = configureStore({reducer: rootReducer});

    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home/>
        </BrowserRouter>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
