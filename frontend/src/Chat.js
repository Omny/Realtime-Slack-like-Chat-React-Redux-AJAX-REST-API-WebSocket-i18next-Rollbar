import { useContext } from 'react';
import AppContext from './contexts';

const Chat = () => {
  const { userStatus } = useContext(AppContext);
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return (
    <div>
      Chat
      <div>
        User:
        {user}
      </div>
      <div>
        loggedIn:
        {token}
      </div>
      <div>
        userStatus:
        {userStatus}
      </div>
    </div>
  );
};

export default Chat;
