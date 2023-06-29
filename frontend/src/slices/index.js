import { configureStore } from '@reduxjs/toolkit';
import channelsReducer, {
  sendNewChannel,
  sendRemoveChannel,
  sendRenameChannel,
  newChannel,
  removeChannel,
  renameChannel,
} from './channelsSlice';
import messagesReducer, { sendNewMessage, newMessage } from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';
import modalReducer from './modalSlice';
import socketManager from '../socketManager';

const socketMiddleware = () => (next) => (action) => {
  const { callback, ...payload } = action.payload;

  switch (action.type) {
    case sendNewMessage.type:
      socketManager.emit('newMessage', payload, callback);
      break;
    case sendNewChannel.type:
      socketManager.emit('newChannel', payload, callback);
      break;
    case sendRemoveChannel.type:
      socketManager.emit('removeChannel', payload, callback);
      break;
    case sendRenameChannel.type:
      socketManager.emit('renameChannel', payload, callback);
      break;
    default:
      break;
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.callback'],
    },
  }).concat(socketMiddleware),
});

socketManager.subscribe('newMessage', (payload) => {
  store.dispatch(newMessage(payload));
});
socketManager.subscribe('newChannel', (payload) => {
  store.dispatch(newChannel(payload));
});
socketManager.subscribe('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload.id));
});
socketManager.subscribe('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload));
});

export default store;
