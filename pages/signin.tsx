import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth } from '../firebase/index';
import * as routes from '../constants/routes';

type SignInPageState = {
  email: string;
  password: string;
  error: any;
};

const INITIAL_STATE: SignInPageState = {
  email: '',
  password: '',
  error: null,
};

export default class SignInPage extends Component<{}, SignInPageState> {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = (e: any): void => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        Router.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <BaseLayoutWithAuthentication>
        <h1>SignIn</h1>

        <form onSubmit={this.onSubmit}>
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
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>

        <p>
          <Link href={routes.FORGET_PASSWORD}>
            <a>Forgot Password?</a>
          </Link>
        </p>

        <p>
          Don't have an account?{' '}
          <Link href={routes.SIGN_UP}>
            <a>Sign Up</a>
          </Link>
        </p>
      </BaseLayoutWithAuthentication>
    );
  }
}
