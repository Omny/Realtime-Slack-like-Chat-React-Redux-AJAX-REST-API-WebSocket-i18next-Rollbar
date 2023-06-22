import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { PlusSquare } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import { setModalAddChannelVisibility, setModalRemoveChannelVisibility, setIdToProcess } from '../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const handleChannelClick = (selectedID) => {
    dispatch(setCurrentChannelId(selectedID));
  };

  const {
    isModalAddChannelVisible,
  } = useSelector((state) => state.modal);
  const handleShowAddChannelModal = () => {
    dispatch(setModalAddChannelVisibility(!isModalAddChannelVisible));
  };
  const handleShowRemoveChannelModal = (id) => {
    dispatch(setIdToProcess(id));
    dispatch(setModalRemoveChannelVisibility(true));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" onClick={handleShowAddChannelModal} variant="text-primary" className="p-0 btn-group-vertical">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          {channels.map(({ id, name, removable }) => {
            const btnClassName = cn('w-100 rounded-0 text-start text-truncate', { 'btn-secondary': id === currentChannelId });
            const btnVariant = id === currentChannelId ? 'secondary' : 'light';
            return removable ? (
              <ButtonGroup key={id} className="d-flex dropdown btn-group">
                <Button type="button" variant={btnVariant} className={btnClassName} onClick={() => handleChannelClick(id)}>
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <DropdownButton title="" as={ButtonGroup} variant={btnVariant} id="bg-nested-dropdown">
                  <Dropdown.Item onClick={() => handleShowRemoveChannelModal(id)} eventKey="1">
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            ) : (
              <Button variant={btnVariant} key={id} type="button" className={btnClassName} onClick={() => handleChannelClick(id)}>
                <span className="me-1">#</span>
                {name}
              </Button>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Channels;
