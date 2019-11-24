import React from 'react';
import { connect } from 'react-redux';

import { BaseLayoutWithAuthorization } from '../components/base-layout';
import { ChangePassword } from '../components/change-password';
import { Row, Col } from 'react-bootstrap';

type AccountPageProps = {
  authUser: any;
};

const AccountPage: React.FC<AccountPageProps> = props => {
  const { authUser } = props;

  return (
    <BaseLayoutWithAuthorization>
      <h1>Account: {authUser ? authUser.email : ''}</h1>
      <Row>
        <Col xs={6}>
          <ChangePassword />
        </Col>
      </Row>
    </BaseLayoutWithAuthorization>
  );
};

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(AccountPage);
