/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { setModalVisibility, setModalType } = modalStateSlice.actions;
export default modalStateSlice.reducer;
