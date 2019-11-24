import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';

import * as routes from '../../constants/routes';
import { SignOutButton } from '../sign-out';
import './styles.scss';

type NavigationProps = {
  authUser: any;
};

const NavigationAuth = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>SV</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as="span">
        <Link href={routes.LANDING}>
          <a className="navbar-nav-link nav-link">Landing</a>
        </Link>
      </Nav.Link>
      <Nav.Link as="span">
        <Link href={routes.HOME}>
          <a className="navbar-nav-link nav-link">Home</a>
        </Link>
      </Nav.Link>
      <Nav.Link as="span">
        <Link href={routes.ACCOUNT}>
          <a className="navbar-nav-link nav-link">Account</a>
        </Link>
      </Nav.Link>
    </Nav>
    <Nav>
      <SignOutButton />
    </Nav>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>SV</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as="span">
        <Link href={routes.LANDING}>
          <a className="navbar-nav-link nav-link">Landing</a>
        </Link>
      </Nav.Link>
    </Nav>
    <Nav>
      <Link href={routes.SIGN_IN}>
        <Button variant="outline-info">Sign In</Button>
      </Link>
      <Link href={routes.SIGN_UP}>
        <Button variant="outline-success">Sign Up</Button>
      </Link>
    </Nav>
  </Navbar>
);

const NavigationComponent: React.FC<NavigationProps> = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser,
});

export const Navigation = connect(mapStateToProps)(NavigationComponent);
