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
import messagesReducer, {
  sendNewMessage,
  newMessage,
} from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';
import modalVisibilityReducer from './modalVisibilitySlice';

const socket = io();

const socketMiddleware = (socketManager) => () => (next) => (action) => {
  if (action.type === sendNewMessage.type) {
    console.log('Sending newMessage:', action.payload);
    socketManager.emit('newMessage', action.payload);
  } else if (action.type === sendNewChannel.type) {
    console.log('Sending newChannel:', action.payload);
    socketManager.emit('newChannel', action.payload);
  } else if (action.type === sendRemoveChannel.type) {
    console.log('Sending removeChannel:', action.payload);
    socketManager.emit('removeChannel', action.payload);
  } else if (action.type === sendRenameChannel.type) {
    console.log('Sending renameChannel:', action.payload);
    socketManager.emit('renameChannel', action.payload);
  }

  return next(action);
};

const socketManager = {
  subscribe: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, payload) => {
    socket.emit(event, payload);
  },
};

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
    modalVisibility: modalVisibilityReducer,
  },
  middleware: [socketMiddleware(socketManager)],
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
  store.dispatch(removeChannel(payload));
});
socketManager.subscribe('renameChannel', (payload) => {
  console.log('Received renameChannel:', payload);
  store.dispatch(renameChannel(payload));
});

export default store;
