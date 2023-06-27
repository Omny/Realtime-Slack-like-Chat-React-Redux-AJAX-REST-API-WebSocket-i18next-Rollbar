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
import setCurrentChannelIdReducer, { setCurrentChannelId } from './currentChannelIdSlice';
import modalReducer, { setIdToProcess } from './modalSlice';

const socket = io();

export const socketManager = {
  subscribe: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, payload, callback) => {
    socket.emit(event, payload, callback);
  },
};

const socketMiddleware = (store) => (next) => (action) => {
  const { callback, ...payload } = action.payload;
  if (action.type === sendNewMessage.type) {
    console.log(action);
    console.log('Sending newMessage:', action.payload);
    socketManager.emit('newMessage', payload, (response) => {
      console.log('Received response:', response);
      // Handle the response if needed
      if (callback && response.status === 'ok') {
        callback();
      }
    });
  } else if (action.type === sendNewChannel.type) {
    console.log('Sending newChannel:', action.payload);
    socketManager.emit('newChannel', payload, (response) => {
      console.log('Received response:', response);
      // Handle the response if needed
      if (callback && response.status === 'ok') {
        callback();
        console.log(response.data.id);
        store.dispatch(setCurrentChannelId(response.data.id)); // Set default id
      }
    });
  } else if (action.type === sendRemoveChannel.type) {
    console.log('Sending removeChannel:', action.payload);
    socketManager.emit('removeChannel', payload, (response) => {
      console.log('Received response:', response);
      // Handle the response if needed
      if (callback && response.status === 'ok') {
        callback();
        store.dispatch(setIdToProcess(0));
      }
    });
  } else if (action.type === sendRenameChannel.type) {
    console.log('Sending renameChannel:', action.payload);
    socketManager.emit('renameChannel', payload, (response) => {
      console.log('Received response:', response);
      // Handle the response if needed
      if (callback && response.status === 'ok') {
        callback();
      }
    });
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
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
