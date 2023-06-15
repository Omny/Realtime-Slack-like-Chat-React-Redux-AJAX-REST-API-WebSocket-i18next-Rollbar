import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    newChannels: channelsAdapter.addMany,
    newChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const existingChannel = state.entities[id];
      if (existingChannel) {
        existingChannel.name = name;
      }
    },
    sendChannel: () => {},
    sendRemoveChannel: () => {},
    sendRenameChannel: () => {},
  },
});

export const {
  newChannel,
  newChannels,
  removeChannel,
  renameChannel,
  sendChannel,
  sendRemoveChannel,
  sendRenameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
