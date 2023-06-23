import {
  useState, useContext, useCallback, useMemo,
} from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate, useNavigate,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../slices';
import AuthContext from '../contexts';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';
import Chat from './Chat';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userGroup, setUserGroup] = useState(localStorage.getItem('token')
    ? 'user' : 'guest');

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUserGroup('guest');
  }, []);

  const handleLogin = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setUserGroup('user');
    navigate('/');
  }, [navigate]);

  const authContextValue = useMemo(
    () => ({
      userGroup,
      handleLogin,
      handleLogout,
    }),
    [userGroup, handleLogin, handleLogout],
  );

  return (
    <AuthContext.Provider
      value={authContextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ChatOrLogin = () => {
  const { userGroup } = useContext(AuthContext);
  return userGroup === 'user' ? <Chat /> : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ChatOrLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  </Router>
);

export default App;
