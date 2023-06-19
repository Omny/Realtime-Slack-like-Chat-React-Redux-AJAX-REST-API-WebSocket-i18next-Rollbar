import { createContext } from 'react';

const AuthContext = createContext({
  userGroup: 'guest',
  setUserGroup: () => {},
});

export default AuthContext;
