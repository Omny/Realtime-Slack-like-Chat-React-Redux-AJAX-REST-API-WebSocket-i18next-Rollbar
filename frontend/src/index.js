import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line functional/no-expression-statements
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
