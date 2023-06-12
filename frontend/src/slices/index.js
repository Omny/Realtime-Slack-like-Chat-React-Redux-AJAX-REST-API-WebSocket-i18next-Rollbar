import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
  },
});

export default store;
