import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { setIdToProcess, setModalType, setModalVisibility } from '../slices/modalSlice';
import AddChannelForm from './AddChannelForm';
import RenameChannelForm from './RenameChannelForm';
import RemoveChannelForm from './RemoveChannelForm';

const forms = {
  addChannel: AddChannelForm,
  renameChannel: RenameChannelForm,
  removeChannel: RemoveChannelForm,
};

const modalTitles = {
  addChannel: 'modals.add',
  renameChannel: 'modals.rename',
  removeChannel: 'modals.remove',
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isVisible, modalType } = useSelector((state) => state.modal);

  const ModalForm = forms[modalType];
  const modalTitle = t(modalTitles[modalType]);

  const handleClose = () => {
    dispatch(setModalVisibility(false));
    dispatch(setIdToProcess(0));
    dispatch(setModalType(null));
  };

  if (!ModalForm || !isVisible || !modalType) {
    return null;
  }
  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
