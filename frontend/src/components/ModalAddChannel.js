import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { sendNewChannel } from '../slices/channelsSlice';
import { setModalAddChannelVisibility } from '../slices/modalSlice';

const AddChannelForm = ({ handleClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    const { name } = values;
    dispatch(sendNewChannel({ name }));
    handleClose();
    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Поле обязательно для заполнения';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleSubmit}
      validate={validateForm}
      validateOnBlur={false}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Form noValidate className="py-2">
          <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
            <Field
              type="text"
              name="name"
              value={values.name}
              aria-label="Новый канал"
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
            <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
              Отменить
            </button>
            <button
              type="submit"
              disabled={!values.name || (errors.name && touched.name) || isSubmitting}
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

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const isModalAddChannelVisible = useSelector((state) => state.modal.isModalAddChannelVisible);

  useEffect(() => {
    if (isModalAddChannelVisible) {
      const input = document.querySelector('[name="name"]');
      if (input) {
        input.focus();
      }
    }
  }, [isModalAddChannelVisible]);

  const handleClose = () => {
    dispatch(setModalAddChannelVisibility(false));
  };

  return (
    <Modal show={isModalAddChannelVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
