import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
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

const socket = io();

export const socketManager = {
  subscribe: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, payload, callback) => {
    socket.emit(event, payload, (response) => callback(response));
  },
};

const socketMiddleware = () => (next) => (action) => {
  const { callback, ...payload } = action.payload;
  if (action.type === sendNewMessage.type) {
    console.log('Sending newMessage:', payload);
    socketManager.emit('newMessage', payload, callback);
  } else if (action.type === sendNewChannel.type) {
    console.log('Sending newChannel:', payload);
    socketManager.emit('newChannel', payload, callback);
  } else if (action.type === sendRemoveChannel.type) {
    console.log('Sending removeChannel:', payload);
    socketManager.emit('removeChannel', payload, callback);
  } else if (action.type === sendRenameChannel.type) {
    console.log('Sending renameChannel:', payload);
    socketManager.emit('renameChannel', payload, callback);
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
  console.log('Received newMessage:', payload);
  store.dispatch(newMessage(payload));
});
socketManager.subscribe('newChannel', (payload) => {
  console.log('Received newChannel:', payload);
  store.dispatch(newChannel(payload));
});
socketManager.subscribe('removeChannel', (payload) => {
  console.log('Received removeChannel:', payload);
  store.dispatch(removeChannel(payload.id));
});
socketManager.subscribe('renameChannel', (payload) => {
  console.log('Received renameChannel:', payload);
  store.dispatch(renameChannel(payload));
});

export default store;
