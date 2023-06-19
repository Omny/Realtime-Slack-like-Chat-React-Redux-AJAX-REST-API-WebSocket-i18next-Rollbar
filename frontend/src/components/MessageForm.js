import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
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
          errors.body = 'Поле обязательно для заполнения';
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
            <button
              type="submit"
              disabled={!values.body || errors.body || isSubmitting}
              className="btn btn-primary btn-group-vertical"
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
