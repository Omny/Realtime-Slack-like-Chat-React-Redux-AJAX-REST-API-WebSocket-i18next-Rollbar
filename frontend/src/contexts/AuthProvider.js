import { useCallback, useMemo, useState } from 'react';
import AuthContext from '.';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  }, []);

  const getToken = useCallback(() => localStorage.getItem('token'), []);

  const getUsername = useCallback(() => localStorage.getItem('user'), []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn, handleLogin, handleLogout, getToken, getUsername,
    }),
    [isLoggedIn, handleLogin, handleLogout, getToken, getUsername],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
