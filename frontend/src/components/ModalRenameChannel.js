import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { selectors as channelsSelectors, sendRenameChannel } from '../slices/channelsSlice';
import { setModalRenameChannelVisibility } from '../slices/modalSlice';

const RenameChannelForm = ({ handleClose }) => {
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
      errors.name = 'Обязательное поле';
    }
    if (channels.some((channel) => channel.name === values.name)) {
      errors.name = 'Такой канал уже существует';
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
            Переименовать канал
            {' '}
            {name}
            ?
          </div>
          <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
            <Field
              type="text"
              name="name"
              value={values.name}
              aria-label="Название канала"
              placeholder="Введите название канала…"
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
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={!values.name || (errors.name && touched.name) || isSubmitting}
              variant="primary"
              default
            >
              Отправить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ModalRenameChannel = () => {
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
