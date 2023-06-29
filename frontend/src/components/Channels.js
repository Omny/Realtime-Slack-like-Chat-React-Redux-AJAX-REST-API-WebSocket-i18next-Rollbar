import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Plus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import {
  setAddChannelModalVisibility,
  setRemoveChannelModalVisibility,
  setRenameChannelModalVisibility,
  setIdToProcess,
} from '../slices/modalSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const handleClickOnChannel = (selectedID) => {
    dispatch(setCurrentChannelId(selectedID));
  };

  const { isAddChannelModalVisible } = useSelector((state) => state.modal);
  const handleShowAddChannelModal = () => {
    dispatch(setAddChannelModalVisibility(!isAddChannelModalVisible));
  };
  const handleShowRemoveChannelModal = (id) => {
    dispatch(setIdToProcess(id));
    dispatch(setRemoveChannelModalVisibility(true));
  };
  const handleShowRenameChannelModal = (id) => {
    dispatch(setIdToProcess(id));
    dispatch(setRenameChannelModalVisibility(true));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button type="button" onClick={handleShowAddChannelModal} variant="outline-secondary" className="p-0 btn-group-vertical">
          <Plus size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          {channels.map(({ id, name, removable }) => {
            const btnClassName = cn('w-100 rounded-0 text-start text-truncate', { 'btn-secondary': id === currentChannelId });
            const btnVariant = id === currentChannelId ? 'secondary' : 'light';
            return removable ? (
              <Dropdown as={ButtonGroup} key={id} className="d-flex dropdown btn-group">
                <Button type="button" variant={btnVariant} className={btnClassName} onClick={() => handleClickOnChannel(id)}>
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle split variant={btnVariant} id="dropdown-split-basic">
                  <span className="visually-hidden">{t('channels.menu')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu title="" variant={btnVariant} id="bg-nested-dropdown">
                  <Dropdown.Item onClick={() => handleShowRemoveChannelModal(id)} eventKey="1">
                    {t('channels.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowRenameChannelModal(id)} eventKey="2">
                    {t('channels.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant={btnVariant} key={id} type="button" className={btnClassName} onClick={() => handleClickOnChannel(id)}>
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
