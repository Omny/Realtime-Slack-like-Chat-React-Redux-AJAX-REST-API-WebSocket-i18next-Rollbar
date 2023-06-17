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
    renameChannel: channelsAdapter.upsertOne,
    sendNewChannel: () => { },
    sendRemoveChannel: () => { },
    sendRenameChannel: () => { },
  },
});

export const {
  newChannel,
  newChannels,
  removeChannel,
  renameChannel,
  sendNewChannel,
  sendRemoveChannel,
  sendRenameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
