import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, sendRenameChannel } from '../slices/channelsSlice';
import { setModalRenameChannelVisibility } from '../slices/modalSlice';

const RenameChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modal.idToProcess);
  const { name } = channels.find((channel) => channel.id === id);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendRenameChannel({ id, name: values.name }));
    handleClose();
    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = t('modals.required');
    }
    if (channels.some((channel) => channel.name === values.name)) {
      errors.name = t('modals.uniq');
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={handleSubmit}
      validate={validateForm}
      validateOnBlur={false}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Form noValidate className="py-1">
          <div className="input-group pb-3">
            {t('modals.rename')}
            {' '}
            {name}
            ?
          </div>
          <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
            <Field
              type="text"
              name="name"
              value={values.name}
              aria-label={t('modals.channelName')}
              placeholder={t('modals.enter')}
              className={cn('mb-4 form-control', {
                'is-invalid': (errors.name && touched.name),
              })}
              data-last-active-input
              autoFocus
            />
            <ErrorMessage name="name" component="div" className="invalid-tooltip" />
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
              disabled={!values.name || (errors.name && touched.name) || isSubmitting}
              variant="primary"
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

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalRenameChannelVisible);

  useEffect(() => {
    if (isModalVisible) {
      const input = document.querySelector('[name="name"]');
      if (input) {
        input.focus();
      }
    }
  }, [isModalVisible]);

  const handleClose = () => {
    dispatch(setModalRenameChannelVisibility(false));
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.rename')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
