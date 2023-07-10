import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '.';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  //
  const navigate = useNavigate();

  const handleLogin = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setLoggedIn(true);

    //
    navigate(routes.homePagePath());
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);

    //
    navigate(routes.loginPagePath());
  }, [navigate]);

  const getToken = useCallback(() => localStorage.getItem('token'), []);

  const getUsername = useCallback(() => localStorage.getItem('user'), []);

  const authContextValue = useMemo(
    () => ({
      loggedIn, handleLogin, handleLogout, getToken, getUsername,
    }),
    [loggedIn, handleLogin, handleLogout, getToken, getUsername],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
