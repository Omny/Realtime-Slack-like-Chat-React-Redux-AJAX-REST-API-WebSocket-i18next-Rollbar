import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
