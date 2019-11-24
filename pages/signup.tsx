import React, { Component } from 'react';
import Router from 'next/router';

import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth, db } from '../firebase/index';
import * as routes from '../constants/routes';
import { Button, Form, Row, Col } from 'react-bootstrap';

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

        <Row>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="signUpFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e: any) =>
                    this.setState({ username: e.target.value })
                  }
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Group>

              <Form.Group controlId="signUpEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e: any) =>
                    this.setState({ email: e.target.value })
                  }
                  type="email"
                  placeholder="Email Address"
                />
              </Form.Group>

              <Form.Group controlId="signUpPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e: any) =>
                    this.setState({ password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group controlId="signUpConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={(e: any) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <Button disabled={isInvalid} type="submit" variant="primary">
                Sign Up
              </Button>

              {error && <p>{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </BaseLayoutWithAuthentication>
    );
  }
}
