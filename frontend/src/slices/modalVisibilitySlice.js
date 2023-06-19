import { createSlice } from '@reduxjs/toolkit';

const modalVisibilitySlice = createSlice({
  name: 'state',
  initialState: {
    isModalVisible: false,
  },
  reducers: {
    setModalVisibility: (state, action) => action.payload,
  },
});

export const { setModalVisibility } = modalVisibilitySlice.actions;
export default modalVisibilitySlice.reducer;
