import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import socketManager from '../socketManager';

const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const idToDelete = useSelector((state) => state.modal.idToProcess);

  const handleSubmit = (values, { setSubmitting }) => {
    const handleAfterResponse = (response) => {
      if (response.status === 'ok') {
        toast.success(t('channels.removed'));
        handleClose();
      }
    };

    const payload = { id: idToDelete };
    socketManager.emit('removeChannel', payload, handleAfterResponse);
    setSubmitting(false);
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
            <Button type="button" variant="secondary" className="me-2" onClick={handleClose}>{t('modals.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting} variant="danger" default>{t('modals.submit')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelForm;
