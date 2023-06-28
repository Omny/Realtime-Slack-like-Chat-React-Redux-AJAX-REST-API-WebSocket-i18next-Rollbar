import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendRemoveChannel } from '../slices/channelsSlice';
import { setIdToProcess, setModalRemoveChannelVisibility } from '../slices/modalSlice';

const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idToDelete = useSelector((state) => state.modal.idToProcess);

  const handleSubmit = (values, { setSubmitting }) => {
    const handleAfterResponse = () => {
      toast.success(t('channels.removed'));
      handleClose();
    };

    setTimeout(() => {
      dispatch(sendRemoveChannel({ id: idToDelete, callback: handleAfterResponse }));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ id: idToDelete }}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
      }) => (
        <Form noValidate className="py-1">
          <div className="input-group pb-3">
            {t('modals.remove')}
            ?
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              {t('modals.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="danger"
              default
            >
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalRemoveChannelVisible);

  const handleClose = () => {
    dispatch(setModalRemoveChannelVisibility(false));
    dispatch(setIdToProcess(0));
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.remove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RemoveChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
