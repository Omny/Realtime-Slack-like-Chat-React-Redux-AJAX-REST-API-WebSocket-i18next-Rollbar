/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { newChannel, removeChannel } from './channelsSlice';

const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: {
    isModalVisible: false,
    modalType: null,
  },
  reducers: {
    setModalVisibility: (state, action) => {
      state.isModalVisible = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(newChannel, (state) => {
    //       state.modalType = null;
    //       state.isModalVisible = false;
    //     })
    //     .addCase(removeChannel, (state) => {
    //       state.modalType = null;
    //       state.isModalVisible = false;
    //     });
    // },
  },
});

export const { setModalVisibility, setModalType } = modalStateSlice.actions;
export default modalStateSlice.reducer;
