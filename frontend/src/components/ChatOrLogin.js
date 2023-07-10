import { Navigate } from 'react-router-dom';
import useAuth from '../hooks';

import Chat from './Chat';

const ChatOrLogin = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Chat /> : <Navigate to="/login" replace />;
};

export default ChatOrLogin;
