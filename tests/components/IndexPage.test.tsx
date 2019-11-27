import * as React from 'react';
import renderer from 'react-test-renderer';
import Index from '../../pages/index';

describe('IndexPage', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Index />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
