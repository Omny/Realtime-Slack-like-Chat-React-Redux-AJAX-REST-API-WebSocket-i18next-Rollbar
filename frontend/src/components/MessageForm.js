import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import { sendNewMessage } from '../slices/messagesSlice';

const MessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = localStorage.getItem('user');

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { body } = values;
        dispatch(sendNewMessage({ body, channelId: currentChannelId, username }));
        resetForm();
        setSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = 'Обязательное поле';
        }
        return errors;
      }}
    >
      {({ errors, values, isSubmitting }) => (
        <Form noValidate className="py-1 border rounded-2">
          <div className={cn('input-group', { 'has-validation': !values.body || errors.body || isSubmitting })}>
            <Field
              type="text"
              name="body"
              value={values.body}
              aria-label="Новое сообщение"
              placeholder="Введите сообщение…"
              className="border-0 p-0 ps-2 form-control"
              data-last-active-input
              autoFocus
            />
            <Button
              type="submit"
              disabled={!values.body || errors.body || isSubmitting}
              variant="primary"
              className="btn-group-vertical"
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
