import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import { openModal } from '../slices/modalSlice';

const Channel = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleShowRemoveChannelModal = (clickedId) => {
    dispatch(openModal({ modalType: 'removeChannel', idToUpdate: clickedId }));
  };

  const handleShowRenameChannelModal = (clickedId) => {
    dispatch(openModal({ modalType: 'renameChannel', idToUpdate: clickedId }));
  };

  const handleClickOnChannel = (clickedId) => {
    dispatch(setCurrentChannelId(clickedId));
  };

  const currentChannelEl = useRef(null);
  useEffect(() => {
    if (currentChannelEl.current) {
      currentChannelEl.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  const isCurrentChannel = id === currentChannelId;
  const btnClassName = cn('w-100 rounded-0 text-start text-truncate', { 'btn-secondary': isCurrentChannel });
  const btnVariant = isCurrentChannel ? 'secondary' : 'light';

  return removable ? (
    <Dropdown ref={isCurrentChannel ? currentChannelEl : null} as={ButtonGroup} className="d-flex dropdown btn-group">
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
    <Button ref={isCurrentChannel ? currentChannelEl : null} variant={btnVariant} type="button" className={btnClassName} onClick={() => handleClickOnChannel(id)}>
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

export default Channel;
