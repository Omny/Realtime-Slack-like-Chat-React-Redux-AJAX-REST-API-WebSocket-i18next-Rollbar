import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalAddChannelVisible: false,
    isModalRemoveChannelVisible: false,
    isModalRenameChannelVisible: false,
    idToProcess: null,
  },
  reducers: {
    setModalAddChannelVisibility: (state, action) => ({
      ...state,
      isModalAddChannelVisible: action.payload,
    }),
    setModalRemoveChannelVisibility: (state, action) => ({
      ...state,
      isModalRemoveChannelVisible: action.payload,
    }),
    setModalRenameChannelVisibility: (state, action) => ({
      ...state,
      isModalRenameChannelVisible: action.payload,
    }),
    setIdToProcess: (state, action) => ({
      ...state,
      idToProcess: action.payload,
    }),
  },
});

export const {
  setModalAddChannelVisibility,
  setModalRemoveChannelVisibility,
  setModalRenameChannelVisibility,
  setIdToProcess,
} = modalSlice.actions;
export default modalSlice.reducer;
