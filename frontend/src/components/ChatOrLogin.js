import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts';

import Chat from './Chat';

const ChatOrLogin = () => {
  const { userGroup } = useContext(AuthContext);
  return userGroup === 'user' ? <Chat /> : <Navigate to="/login" replace />;
};

export default ChatOrLogin;
