import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../helpers/auth';
import AppContext from '../contexts';

import { sendMessage, newMessages } from '../slices/messagesSlice';
import {
  newChannels, sendChannel, sendRemoveChannel, sendRenameChannel,
} from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';

import Channels from './Channels';
import Messages from './Messages';

const ChatComponent = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [channelName, setChannelName] = useState('');

  const handleSendMessage = () => {
    dispatch(sendMessage({ body: message, channelId: 1, username: 'admin' }));
    setMessage('');
  };

  const handleCreateChannel = () => {
    dispatch(sendChannel({ name: channelName }));
    setChannelName('');
  };

  const handleRemoveChannel = () => {
    dispatch(sendRemoveChannel({ id: 6 }));
  };

  const handleRenameChannel = () => {
    dispatch(sendRenameChannel({ id: 7, name: 'new name channel' }));
  };
  return (
    <div>
      <h2>Chat Component</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="button" onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
        />
        <button type="button" onClick={handleCreateChannel}>Create Channel</button>
        <button type="button" onClick={handleRemoveChannel}>Remove Channel</button>
        <button type="button" onClick={handleRenameChannel}>Rename Channel</button>
      </div>
    </div>
  );
};

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
        const {
          channels,
          messages,
          currentChannelId,
        } = response.data;
        dispatch(newChannels(channels));
        dispatch(newMessages(messages));
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
