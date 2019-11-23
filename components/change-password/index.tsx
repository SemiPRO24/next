import React, { Component } from 'react';

import { auth } from '../../firebase/index';

type ChangePasswordState = {
  password: string;
  confirmPassword: string;
  error: any;
};

const INITIAL_STATE: ChangePasswordState = {
  password: '',
  confirmPassword: '',
  error: null,
};

export class ChangePassword extends Component<{}, ChangePasswordState> {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = (e: any): void => {
    const { password } = this.state;

    auth
      .doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { password, confirmPassword, error } = this.state;

    const isInvalid = password !== confirmPassword || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="New Password"
        />
        <input
          value={confirmPassword}
          onChange={e => this.setState({ confirmPassword: e.target.value })}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
