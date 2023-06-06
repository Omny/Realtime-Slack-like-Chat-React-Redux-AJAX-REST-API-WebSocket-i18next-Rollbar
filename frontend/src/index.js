import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
    errorElement: <NotFound />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

const App = () => (
  <React.StrictMode>
    <Nav />
    <RouterProvider router={router} />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
