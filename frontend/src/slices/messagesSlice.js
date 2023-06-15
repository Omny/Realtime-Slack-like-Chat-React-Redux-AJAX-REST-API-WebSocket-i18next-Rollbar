import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: messagesAdapter.addOne,
    newMessages: messagesAdapter.addMany,
    sendNewMessage: () => { },
  },
});

export const { newMessage, newMessages, sendNewMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
