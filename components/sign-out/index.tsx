import React from 'react';

import { auth } from '../../firebase/index';

export const SignOutButton: React.FC<{}> = () => (
  <button type="button" onClick={auth.doSignOut}>
    Sign Out
  </button>
);
