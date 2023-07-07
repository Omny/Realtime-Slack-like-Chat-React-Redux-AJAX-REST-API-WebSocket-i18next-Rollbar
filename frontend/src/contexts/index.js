import { createContext } from 'react';

const AuthContext = createContext({
  userGroup: null,
  setUserGroup: () => {},
});

export default AuthContext;
