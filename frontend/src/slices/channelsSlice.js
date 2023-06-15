import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
    changeChannelName: (state, action) => {
      const { id, name } = action.payload;
      const existingChannel = state.entities[id];
      if (existingChannel) {
        existingChannel.name = name;
      }
    },
    createChannel: (state, action) => {
      console.log('createChannel: ', action.payload);
    },
    removeChannel: (state, action) => {
      console.log('removeChannel: ', action.payload);
    },
    renameChannel: (state, action) => {
      console.log('processRenameChannel: ', action.payload);
    },
  },
});

export const {
  addChannel,
  addChannels,
  deleteChannel,
  changeChannelName,
  createChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
