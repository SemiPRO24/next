import React from 'react';
import renderer from 'react-test-renderer';
import { ChangePassword } from '../../components/change-password';

describe('ChangePassword', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ChangePassword />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
