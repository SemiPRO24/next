import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BaseLayoutWithAuthorization } from '../components/base-layout';
import { db } from '../firebase/index';

type HomePageProps = {
  onSetUsers: Function;
  users: Array<any>;
};

const fromObjectToList = (object: any) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component<HomePageProps> {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(fromObjectToList(snapshot.val()))
    );
  }

  render() {
    const { users } = this.props;

    return (
      <BaseLayoutWithAuthorization>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users.length && (
          <div className="user-list">
            <h2>List of App User IDs</h2>
            {users.map(user => (
              <div key={user.index}>{user.index}</div>
            ))}
          </div>
        )}
      </BaseLayoutWithAuthorization>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: Array<any>) => dispatch({ type: 'USERS_SET', users }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
