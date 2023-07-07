import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    modalType: null,
    channelIdToUpdate: 0,
  },
  reducers: {
    openModal: (state, action) => ({
      ...state,
      isVisible: true,
      modalType: action.payload.modalType,
      channelIdToUpdate: action.payload.channelIdToUpdate ?? 0,
    }),
    closeModal: (state) => ({
      ...state,
      isVisible: false,
      modalType: null,
      channelIdToUpdate: 0,
    }),
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;
