import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    newChannels: channelsAdapter.addMany,
    newChannel: channelsAdapter.addOne,
    removeChannel(state, action) {
      channelsAdapter.removeOne(state, action.payload.id);
    },
    renameChannel: channelsAdapter.upsertOne,
    sendChannel: () => { },
    sendRemoveChannel: () => { },
    sendRenameChannel: () => { },
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
