import React, { Component } from 'react';
import Router from 'next/router';

import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth, db } from '../firebase/index';
import * as routes from '../constants/routes';

type SignUpPageState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: any;
};

const INITIAL_STATE: SignUpPageState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

export default class SignUpPage extends Component<{}, SignUpPageState> {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = (e: any): void => {
    const { username, email, password } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser: any) => {
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            Router.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;

    const isInvalid =
      password !== confirmPassword || password === '' || username === '';

    return (
      <BaseLayoutWithAuthentication>
        <h1>SignUp</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <input
            value={confirmPassword}
            onChange={e => this.setState({ confirmPassword: e.target.value })}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </BaseLayoutWithAuthentication>
    );
  }
}
