import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

const Messages = () => {
  // const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {'# '}
              {currentChannel && currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {'Сообщений: '}
            {currentMessages && currentMessages.length}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {currentMessages && currentMessages
            .map(({
              body, username, id,
            }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                {': '}
                {body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value=""
                data-last-active-input=""
              />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
