import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
    modal: modalReducer,
  },
});

export default store;
