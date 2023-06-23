import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import AppContext from '../contexts';

import { newMessages } from '../slices/messagesSlice';
import { newChannels } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';

import Channels from './Channels';
import Messages from './Messages';
import ModalAddChannel from './ModalAddChannel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const Chat = () => {
  const { userGroup, getAuthHeader } = useContext(AppContext);

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
  }, [dispatch, userGroup, getAuthHeader]);

  const {
    isModalAddChannelVisible,
    isModalRemoveChannelVisible,
    isModalRenameChannelVisible,
  } = useSelector((state) => state.modal);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        {isModalAddChannelVisible ? <ModalAddChannel /> : null}
        {isModalRemoveChannelVisible ? <ModalRemoveChannel /> : null}
        {isModalRenameChannelVisible ? <ModalRenameChannel /> : null}
      </div>
    </div>
  );
};

export default Chat;
