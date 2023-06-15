import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../slices/messagesSlice';
import { createChannel, removeChannel, renameChannel } from '../slices/channelsSlice';

const ChatComponent = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [channelName, setChannelName] = useState('');

  const handleSendMessage = () => {
    dispatch(sendMessage({ body: message, channelId: 1, username: 'admin' }));
    setMessage('');
  };

  const handleCreateChannel = () => {
    dispatch(createChannel({ name: channelName }));
    setChannelName('');
  };

  const handleRemoveChannel = () => {
    dispatch(removeChannel({ id: 6 }));
  };

  const handleRenameChannel = () => {
    dispatch(renameChannel({ id: 7, name: 'new name channel' }));
  };

  return (
    <div>
      <h2>Chat Component</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="button" onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
        />
        <button type="button" onClick={handleCreateChannel}>Create Channel</button>
        <button type="button" onClick={handleRemoveChannel}>Remove Channel</button>
        <button type="button" onClick={handleRenameChannel}>Rename Channel</button>
      </div>
    </div>
  );
};

export default ChatComponent;
