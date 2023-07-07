import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts';

import Chat from './Chat';

const ChatOrLogin = () => {
  const { getToken } = useContext(AuthContext);
  return getToken() ? <Chat /> : <Navigate to="/login" replace />;
};

export default ChatOrLogin;
