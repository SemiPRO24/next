import React, { Component } from 'react';
import Router from 'next/router';
import { BaseLayoutWithAuthentication } from '../components/base-layout';
import { auth } from '../firebase/index';
import * as routes from '../constants/routes';
import { Button, Row, Col, Form } from 'react-bootstrap';

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

        <Row>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formForgetPasswordEmail">
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

              <Button disabled={isInvalid} type="submit" variant="primary">
                Reset My Password
              </Button>

              {error && <p>{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </BaseLayoutWithAuthentication>
    );
  }
}
