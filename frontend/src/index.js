import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';
import AppContext from './contexts';

const AppProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [userGroup, setUserGroup] = useState(token ? 'user' : 'guest');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{
      userGroup, setUserGroup,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

const ChatOrLogin = () => {
  const { userGroup } = useContext(AppContext);
  return userGroup === 'user' ? <Chat /> : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatOrLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>,
);
