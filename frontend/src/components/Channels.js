import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { PlusSquare } from 'react-bootstrap-icons';

import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          {channels.map(({ id, name }) => {
            const btnClassName = cn('w-100 rounded-0 text-start btn', { 'btn-secondary': id === currentChannelId });
            const handleChannelClick = (selectedID) => {
              dispatch(setCurrentChannelId(selectedID));
            };

            return (
              <button key={id} type="button" className={btnClassName} onClick={() => handleChannelClick(id)}>
                <span className="me-1">#</span>
                {name}
              </button>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Channels;
