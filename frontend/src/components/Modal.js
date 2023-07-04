import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const modals = {
  addChannel: AddChannelModal,
  renameChannel: RenameChannelModal,
  removeChannel: RemoveChannelModal,
};

const Modal = () => {
  const { isVisible, modalType } = useSelector((state) => state.modal);
  const ModalComponent = modals[modalType];

  if (!ModalComponent || !isVisible || !modalType) {
    return null;
  }
  return (
    <ModalComponent />
  );
};

export default Modal;
