import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import { selectors as channelsSelectors, sendRemoveChannel } from '../slices/channelsSlice';
import { setModalRemoveChannelVisibility } from '../slices/modalSlice';

const RemoveChannelForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modal.idToProcess);
  const { name } = channels.find((channel) => channel.id === id);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendRemoveChannel({ id }));
    handleClose();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
      }) => (
        <Form noValidate className="py-2">
          <div className="input-group">
            Удалить канал
            {' '}
            {name}
            ?
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
              Отменить
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Отправить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalRemoveChannelVisible);

  useEffect(() => {
    if (isModalVisible) {
      const input = document.querySelector('[name="name"]');
      if (input) {
        input.focus();
      }
    }
  }, [isModalVisible]);

  const handleClose = () => {
    dispatch(setModalRemoveChannelVisibility(false));
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RemoveChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
