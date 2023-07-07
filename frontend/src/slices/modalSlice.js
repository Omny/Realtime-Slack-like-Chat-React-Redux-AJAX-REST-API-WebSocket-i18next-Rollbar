import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    modalType: null,
    channelIdToUpdate: null,
  },
  reducers: {
    openModal: (state, action) => ({
      isVisible: true,
      modalType: action.payload.modalType,
      channelIdToUpdate: action.payload.channelIdToUpdate ?? null,
    }),
    closeModal: () => ({
      isVisible: false,
      modalType: null,
      channelIdToUpdate: null,
    }),
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;
