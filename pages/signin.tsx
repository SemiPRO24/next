import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth } from '../firebase/index';
import * as routes from '../constants/routes';
import { Button, Form, Row, Col } from 'react-bootstrap';

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

        <Row>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="signInEmail">
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

              <Form.Group controlId="signInPassword">
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

              <Button disabled={isInvalid} type="submit" variant="primary">
                Sign In
              </Button>

              {error && <p>{error.message}</p>}
            </Form>

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
          </Col>
        </Row>
      </BaseLayoutWithAuthentication>
    );
  }
}
