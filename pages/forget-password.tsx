import React, { Component } from 'react';
import Router from 'next/router';
import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth } from '../firebase/index';
import * as routes from '../constants/routes';

type ForgetPasswordPageState = {
  email: string;
  error: any;
};

const INITIAL_STATE: ForgetPasswordPageState = {
  email: '',
  error: null,
};

export default class ForgetPasswordPage extends Component<
  {},
  ForgetPasswordPageState
> {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = (e: any): void => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        Router.push(routes.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <BaseLayoutWithAuthentication>
        <h1>Forget Password</h1>

        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email Address"
          />
          <button disabled={isInvalid} type="submit">
            Reset My Password
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </BaseLayoutWithAuthentication>
    );
  }
}
