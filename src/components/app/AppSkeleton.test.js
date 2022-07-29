import { render } from '@testing-library/react';
import AppSkeleton from './AppSkeleton';

it('App renders correctly', () => {
  const tree = render(<AppSkeleton>children</AppSkeleton>);
  expect(tree).toMatchSnapshot();
});


// it('changes the class when hovered', () => {
//   const component = renderer.create(
//     <AppSkeleton>children</AppSkeleton>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
//
//   // manually trigger the callback
//   renderer.act(() => {
//     tree.props.onMouseEnter();
//   });
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
//
//   // manually trigger the callback
//   renderer.act(() => {
//     tree.props.onMouseLeave();
//   });
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
