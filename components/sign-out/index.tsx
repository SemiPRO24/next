import React from 'react';

import { auth } from '../../firebase/index';
import { Button } from 'react-bootstrap';

export const SignOutButton: React.FC<{}> = () => (
  <Button onClick={auth.doSignOut} variant="outline-danger">
    Sign Out
  </Button>
);
