const Chat = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return (
    <div>
      Chat
      <div>
        Username:
        {username}
      </div>
      <div>
        Token:
        {token}
      </div>
    </div>
  );
};

export default Chat;
