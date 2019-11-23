import React from 'react';
import { connect } from 'react-redux';

import { BaseLayoutWithAuthorization } from '../components/base-layout';
import { ChangePassword } from '../components/change-password';

type AccountPageProps = {
  authUser: any;
};

const AccountPage: React.FC<AccountPageProps> = ({ authUser }) => (
  <BaseLayoutWithAuthorization>
    <h1>Account: {authUser.email}</h1>
    <ChangePassword />
  </BaseLayoutWithAuthorization>
);

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(AccountPage);
