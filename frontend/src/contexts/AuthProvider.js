import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '.';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userGroup, setUserGroup] = useState(localStorage.getItem('token')
    ? 'user' : 'guest');

  const handleLogin = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setUserGroup('user');
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUserGroup('guest');
  }, []);

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const authContextValue = useMemo(
    () => ({
      userGroup,
      handleLogin,
      handleLogout,
      getAuthHeader,
    }),
    [userGroup, handleLogin, handleLogout, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
