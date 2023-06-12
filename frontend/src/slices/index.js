import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import commentsReducer from './commentsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    comments: commentsReducer,
  },
});

export default store;
