import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

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
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formChangePassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e: any) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="New Password"
          />
        </Form.Group>

        <Form.Group controlId="formChangeConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e: any) =>
              this.setState({ confirmPassword: e.target.value })
            }
            type="password"
            placeholder="Confirm New Password"
          />
        </Form.Group>

        <Button disabled={isInvalid} type="submit" variant="primary">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}
