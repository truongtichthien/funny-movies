import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Logo from './Logo';

describe('Test Logo component', () => {
  it('Logo renders correctly', () => {
    const tree = render(
      <BrowserRouter>
        <Logo/>
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
