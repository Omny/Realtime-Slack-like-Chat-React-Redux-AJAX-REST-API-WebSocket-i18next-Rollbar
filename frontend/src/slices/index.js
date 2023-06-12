import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;
