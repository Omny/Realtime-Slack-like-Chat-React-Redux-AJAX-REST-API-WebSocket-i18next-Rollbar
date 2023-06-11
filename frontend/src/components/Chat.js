// import axios from 'axios';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, doneToggle } from '../slices/chat';
import AppContext from '../contexts';
// import routes from '../routes';

// const getDataUsingApi = async () => {
//   try {
//     const response = await axios.get(routes.getData());
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

const Chat = () => {
  const { userGroup } = useContext(AppContext);

  const items = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  console.log(items, dispatch);
  console.log(add, remove, doneToggle);

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
