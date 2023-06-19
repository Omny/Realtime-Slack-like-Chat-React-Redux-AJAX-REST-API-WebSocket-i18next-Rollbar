import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendNewMessage: () => { },
    newMessage: messagesAdapter.addOne,
    newMessages: messagesAdapter.addMany,
  },
});

export const { sendNewMessage, newMessage, newMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
