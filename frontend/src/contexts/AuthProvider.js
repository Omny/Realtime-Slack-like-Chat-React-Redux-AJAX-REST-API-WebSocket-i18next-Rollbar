import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '.';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleLogin = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    navigate(routes.homePagePath());
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate(routes.loginPagePath());
  }, [navigate]);

  const getToken = useCallback(() => localStorage.getItem('token'), []);

  const getUsername = useCallback(() => localStorage.getItem('user'), []);

  const authContextValue = useMemo(
    () => ({
      handleLogin, handleLogout, getToken, getUsername,
    }),
    [handleLogin, handleLogout, getToken, getUsername],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
