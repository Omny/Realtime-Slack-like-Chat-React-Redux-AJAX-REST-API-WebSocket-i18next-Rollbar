import { createContext } from 'react';

const AppContext = createContext({
  loggedIn: false,
  loginError: null,
});

export default AppContext;
