import { createContext } from 'react';

const AppContext = createContext({
  userStatus: null,
  setUserStatus: () => {},
});

export default AppContext;
