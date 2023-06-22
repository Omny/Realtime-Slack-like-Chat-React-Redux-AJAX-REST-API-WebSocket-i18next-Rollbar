/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { newChannel, removeChannel } from './channelsSlice';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalAddChannelVisible: false,
    isModalRemoveChannelVisible: false,
    isModalRenameChannelVisible: false,
    idToProcess: null,
  },
  reducers: {
    setModalAddChannelVisibility: (state, action) => {
      state.isModalAddChannelVisible = action.payload;
    },
    setModalRemoveChannelVisibility: (state, action) => {
      state.isModalRemoveChannelVisible = action.payload;
    },
    setModalRenameChannelVisibility: (state, action) => {
      state.isModalRenameChannelVisible = action.payload;
    },
    setIdToProcess: (state, action) => {
      state.idToProcess = action.payload;
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(newChannel, (state) => {
    //       state.modalType = null;
    //       state.isModalAddChannelVisible = false;
    //     })
    //     .addCase(removeChannel, (state) => {
    //       state.modalType = null;
    //       state.isModalAddChannelVisible = false;
    //     });
    // },
  },
});

export const {
  setModalAddChannelVisibility,
  setModalRemoveChannelVisibility,
  setModalRenameChannelVisibility,
  setIdToProcess,
} = modalSlice.actions;
export default modalSlice.reducer;
