import { createSlice } from '@reduxjs/toolkit';
import { newChannel, removeChannel } from './channelsSlice';

const initialState = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newChannel, (state, action) => action.payload.id);
    builder.addCase(removeChannel, () => initialState);
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
