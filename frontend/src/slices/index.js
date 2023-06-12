import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import setCurrentChannelIdReducer from './currentChannelIdSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: setCurrentChannelIdReducer,
  },
});

export default store;
