import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../i18n';

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
        <ToastContainer />
      </AuthProvider>
    </Provider>
  </Router>
);

export default App;
