import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../helpers/auth';
import AppContext from '../contexts';

import Channels from './Channels';
import Messages from './Messages';
import ChatComponent from './ChatComponent';

import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';

const Chat = () => {
  const { userGroup } = useContext(AppContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userGroup === 'guest') {
      return;
    }
    const fetchData = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await axios.get(routes.dataPath(), { headers: authHeader });
        console.log(response.data);
        const {
          channels,
          messages,
          currentChannelId,
        } = response.data;
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, userGroup]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChatComponent />
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
