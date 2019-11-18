import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import { SignOutButton } from '../sign-out';

type NavigationProps = {
  authUser: any;
};

const NavigationAuth = () => (
  <ul>
    <li>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </li>
    <li>
      <Link href={routes.HOME}>
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href={routes.ACCOUNT}>
        <a>Account</a>
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </li>
    <li>
      <Link href={routes.SIGN_IN}>
        <a>Sign In</a>
      </Link>
    </li>
  </ul>
);

const NavigationComponent: React.FC<NavigationProps> = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser,
});

export const Navigation = connect(mapStateToProps)(NavigationComponent);
