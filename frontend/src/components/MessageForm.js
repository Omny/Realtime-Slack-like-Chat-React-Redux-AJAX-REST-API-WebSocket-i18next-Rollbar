import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { sendMessage } from '../slices/messagesSlice';

const MessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = localStorage.getItem('user');

  const handleSubmit = (values, { resetForm }) => {
    const { body } = values;
    dispatch(sendMessage({ body, channelId: currentChannelId, username }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = 'Поле обязательно для заполнения';
        }
        return errors;
      }}
    >
      {({ errors }) => (
        <Form noValidate className="py-1 border rounded-2">
          <div className={cn('input-group', { 'has-validation': errors.body })}>
            <Field
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение…"
              className="border-0 p-0 ps-2 form-control"
              data-last-active-input
              required
              autoFocus
            />
            <button type="submit" disabled={errors.body} className="btn btn-group-vertical">
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
