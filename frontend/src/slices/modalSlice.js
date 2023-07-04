import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    modalType: null,
    idToProcess: 0,
  },
  reducers: {
    setModalVisibility: (state, action) => ({
      ...state,
      isVisible: action.payload,
    }),
    setModalType: (state, action) => ({
      ...state,
      modalType: action.payload,
    }),
    setIdToProcess: (state, action) => ({
      ...state,
      idToProcess: action.payload,
    }),
  },
});

export const {
  setModalVisibility,
  setModalType,
  setIdToProcess,
} = modalSlice.actions;
export default modalSlice.reducer;
