import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import channelsReducer, { addChannel, deleteChannel, changeChannelName } from './channelsSlice';
import messagesReducer, { addMessage } from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';

const socket = io();

const socketMiddleware = (store) => {
  // Подписка на новые сообщения
  socket.on('newMessage', (payload) => {
    console.log('Received newMessage:', payload);
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    console.log('Received newChannel:', payload);
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    console.log('Received removeChannel:', payload);
    store.dispatch(deleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    console.log('Received renameChannel:', payload);
    store.dispatch(changeChannelName(payload));
  });

  return (next) => (action) => {
    if (action.type === 'messages/sendMessage') {
      console.log('Sending newMessage:', action.payload);
      socket.emit('newMessage', action.payload);
    } else if (action.type === 'channels/createChannel') {
      console.log('Sending newChannel:', action.payload);
      socket.emit('newChannel', action.payload);
    } else if (action.type === 'channels/removeChannel') {
      console.log('Sending removeChannel:', action.payload);
      socket.emit('removeChannel', action.payload);
    } else if (action.type === 'channels/renameChannel') {
      console.log('Sending renameChannel:', action.payload);
      socket.emit('renameChannel', action.payload);
    }

    return next(action);
  };
};

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
  },
  middleware: [socketMiddleware],
});

export default store;
