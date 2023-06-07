import { useContext } from 'react';
import AppContext from './contexts';

const Chat = () => {
  const { userGroup } = useContext(AppContext);
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
        userGroup:
        {userGroup}
      </div>
    </div>
  );
};

export default Chat;
