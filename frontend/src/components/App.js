import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../i18n';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from '../slices';
import AuthProvider from '../contexts/AuthProvider';

import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';
import ChatOrLogin from './ChatOrLogin';
import ErrorDisplay from './ErrorDisplay';

const rollbarConfig = {
  accessToken: 'f42e1f74f582468985d440c4d65b1b18',
  environment: 'testenv',
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary fallbackUI={ErrorDisplay}>
        <Router>
          <Provider store={store}>
            <AuthProvider>
              <Nav />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ChatOrLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer />
            </AuthProvider>
          </Provider>
        </Router>
      </ErrorBoundary>
    </RollbarProvider>
  </div>
);

export default App;
