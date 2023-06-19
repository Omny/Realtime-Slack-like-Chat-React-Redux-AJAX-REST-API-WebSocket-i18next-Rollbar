import { createSlice } from '@reduxjs/toolkit';
import { newChannel, removeChannel } from './channelsSlice';

const initialId = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: initialId,
  reducers: {
    setCurrentChannelId: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(newChannel, (state, action) => action.payload.id)
      .addCase(removeChannel, () => initialId);
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
