import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { useContext, useEffect } from 'react';
import AppContext from '../contexts';

import routes from '../routes';
import getAuthHeader from '../helpers/auth';

// import { actions as channelsActions } from '../slices/channelsSlice';

const Chat = () => {
  const { userGroup } = useContext(AppContext);
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const items = useSelector((state) => state.chat);
  console.log(items, dispatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await axios.get(routes.dataPath(), { headers: authHeader });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    fetchData();
  }, [token]);

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
