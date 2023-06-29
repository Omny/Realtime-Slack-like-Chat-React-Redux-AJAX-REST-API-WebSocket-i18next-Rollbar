import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialId = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: initialId,
  reducers: {
    setCurrentChannelId: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const currentChannelId = state;
        return (currentChannelId === action.payload) ? initialId : currentChannelId;
      });
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
