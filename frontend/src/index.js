import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';
import AppContext from './contexts';

const AppProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [userStatus, setUserStatus] = useState(token ? 'user' : 'guest');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{
      userStatus, setUserStatus,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

const GuestsRedirect = () => {
  const { userStatus } = useContext(AppContext);
  console.log(userStatus);
  return userStatus === 'user' ? <Chat /> : <Navigate to="/login" />;
};

const App = () => (
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<GuestsRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
