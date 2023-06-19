import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { sendNewChannel } from '../slices/channelsSlice';
import { setModalVisibility } from '../slices/modalVisibilitySlice';

const ModalFrame = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modalVisibility);

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
      >
        {({ errors, values, isSubmitting }) => (
          <Form noValidate className="py-1 border rounded-2">
            <Modal.Body>
              <div className={cn('input-group', { 'has-validation': !values.name || errors.name || isSubmitting })}>
                <Field
                  type="text"
                  name="name"
                  value={values.name}
                  aria-label="Новый канал"
                  placeholder="Введите название канала…"
                  className="mb-2 form-control"
                  data-last-active-input
                  autoFocus
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">
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
