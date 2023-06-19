import { useState, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../slices';
import AuthContext from '../contexts';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [userGroup, setUserGroup] = useState(token ? 'user' : 'guest');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      userGroup, setUserGroup,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ChatOrLogin = () => {
  const { userGroup } = useContext(AuthContext);
  return userGroup === 'user' ? <Chat /> : <Navigate to="/login" />;
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatOrLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
