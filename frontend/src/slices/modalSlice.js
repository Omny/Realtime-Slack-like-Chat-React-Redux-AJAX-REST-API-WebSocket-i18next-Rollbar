import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isAddChannelModalVisible: false,
    isRemoveChannelModalVisible: false,
    isRenameChannelModalVisible: false,
    idToProcess: 0,
  },
  reducers: {
    setAddChannelModalVisibility: (state, action) => ({
      ...state,
      isAddChannelModalVisible: action.payload,
    }),
    setRemoveChannelModalVisibility: (state, action) => ({
      ...state,
      isRemoveChannelModalVisible: action.payload,
    }),
    setRenameChannelModalVisibility: (state, action) => ({
      ...state,
      isRenameChannelModalVisible: action.payload,
    }),
    setIdToProcess: (state, action) => ({
      ...state,
      idToProcess: action.payload,
    }),
  },
});

export const {
  setAddChannelModalVisibility,
  setRemoveChannelModalVisibility,
  setRenameChannelModalVisibility,
  setIdToProcess,
} = modalSlice.actions;
export default modalSlice.reducer;
