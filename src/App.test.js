import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('App renders correctly', () => {
  const tree = render(<App/>);
  expect(tree).toMatchSnapshot();
});
