/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { newChannel, removeChannel } from './channelsSlice';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalAddChannelVisible: false,
    modalType: null,
  },
  reducers: {
    setModalAddChannelVisibility: (state, action) => {
      state.isModalAddChannelVisible = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
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

export const { setModalAddChannelVisibility, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
