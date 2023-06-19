import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { sendNewChannel } from '../slices/channelsSlice';
import { setModalVisibility } from '../slices/modalStateSlice';

const ModalFrame = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modalState.isModalVisible);
  console.log(isModalVisible);

  const handleClose = () => dispatch(setModalVisibility(false));

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { name } = values;
          dispatch(sendNewChannel({ name }));
          resetForm();
          handleClose();
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Поле обязательно для заполнения';
          }
          return errors;
        }}
        validateOnBlur={false}
      >
        {({
          errors, touched, values, isSubmitting,
        }) => (
          <Form noValidate className="py-1 border rounded-2">
            <Modal.Body>
              <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
                <Field
                  type="text"
                  name="name"
                  value={values.name}
                  aria-label="Новый канал"
                  placeholder="Введите название канала…"
                  className={cn('mb-2 form-control', {
                    'is-invalid': (errors.name && touched.name),
                  })}
                  data-last-active-input
                  autoFocus
                />
                <ErrorMessage name="name" component="div" className="invalid-tooltip" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Отменить
              </button>
              <button type="submit" disabled={!values.name || (errors.name && touched.name) || isSubmitting} className="btn btn-primary">
                Отправить
              </button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalFrame;
