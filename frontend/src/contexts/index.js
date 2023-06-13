import { createContext } from 'react';

const AppContext = createContext({
  userGroup: 'guest',
  setUserGroup: () => {},
});

export default AppContext;
