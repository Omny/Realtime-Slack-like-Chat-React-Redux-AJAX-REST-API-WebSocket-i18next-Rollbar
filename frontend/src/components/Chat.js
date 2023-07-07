import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import AppContext from '../contexts';
import { newMessages } from '../slices/messagesSlice';
import { newChannels } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import Channels from './Channels';
import Messages from './Messages';
import ModalWindow from './ModalWindow';

const Chat = () => {
  const { t } = useTranslation();
  const { getToken, handleLogout } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const authHeader = { Authorization: `Bearer ${token}` };
        const response = await axios.get(routes.dataPath(), { headers: authHeader });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(newChannels(channels));
        dispatch(newMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          handleLogout();
        } else if (axios.isAxiosError(error)) {
          toast.error(t('errors.network'));
        } else {
          toast.error(t('errors.unknown'));
        }
      }
    };
    fetchData();
  }, [dispatch, getToken, handleLogout, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <ModalWindow />
      </div>
    </div>
  );
};

export default Chat;
