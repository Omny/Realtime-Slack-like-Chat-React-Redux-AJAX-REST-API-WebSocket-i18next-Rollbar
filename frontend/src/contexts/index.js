import { createContext } from 'react';

const AppContext = createContext({
  userGroup: null,
  setUserGroup: () => {},
});

export default AppContext;
