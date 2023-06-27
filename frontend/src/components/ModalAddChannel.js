import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, sendNewChannel } from '../slices/channelsSlice';
import { setModalAddChannelVisibility } from '../slices/modalSlice';

const AddChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleMakeAfter = () => {
    toast.success(t('channels.created'));
    handleClose();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const newName = values.name;
      dispatch(sendNewChannel({ name: newName, callback: () => handleMakeAfter() }));
      setSubmitting(false);
    }, 400);
  };

  const ChannelsSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .min(3, t('modals.passMin3'))
      .max(20, t('modals.passMax20'))
      .required(t('modals.required'))
      .test('unique', t('modals.uniq'), (value) => !channels.some((channel) => channel.name === value)),
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleSubmit}
      validationSchema={ChannelsSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Form noValidate className="py-1">
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
              disabled={isSubmitting}
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

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalAddChannelVisible);

  useEffect(() => {
    if (isModalVisible) {
      const input = document.querySelector('[name="name"]');
      if (input) {
        input.focus();
      }
    }
  }, [isModalVisible]);

  const handleClose = () => {
    dispatch(setModalAddChannelVisibility(false));
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
