import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    sendNewChannel: () => { },
    sendRemoveChannel: () => { },
    sendRenameChannel: () => { },
    newChannels: channelsAdapter.addMany,
    newChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
  },
});

export const {
  sendNewChannel,
  sendRemoveChannel,
  sendRenameChannel,
  newChannel,
  newChannels,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
