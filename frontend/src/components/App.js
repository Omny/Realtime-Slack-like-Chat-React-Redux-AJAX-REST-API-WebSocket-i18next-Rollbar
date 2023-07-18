import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import AuthProvider from '../contexts/AuthProvider';
import socketManager from '../socketManager';
import { newMessage } from '../slices/messagesSlice';
import { newChannel, removeChannel, renameChannel } from '../slices/channelsSlice';
import routes from '../routes';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import Chat from './Chat';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import ErrorDisplay from './ErrorDisplay';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socketManager.subscribe('newMessage', (payload) => { dispatch(newMessage(payload)); });
    socketManager.subscribe('newChannel', (payload) => { dispatch(newChannel(payload)); });
    socketManager.subscribe('removeChannel', (payload) => { dispatch(removeChannel(payload.id)); });
    socketManager.subscribe('renameChannel', (payload) => { dispatch(renameChannel(payload)); });
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <ErrorBoundary fallbackUI={ErrorDisplay}>
        <Router>
          <AuthProvider>
            <Nav />
            <Routes>
              <Route path={routes.loginPagePath()} element={<Login />} />
              <Route path={routes.signupPagePath()} element={<Signup />} />
              <Route
                path={routes.homePagePath()}
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
