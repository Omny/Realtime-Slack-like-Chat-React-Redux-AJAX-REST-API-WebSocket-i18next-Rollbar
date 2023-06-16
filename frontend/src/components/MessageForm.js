import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { sendNewMessage } from '../slices/messagesSlice';

const MessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = localStorage.getItem('user');
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const { body } = values;
        dispatch(sendNewMessage({ body, channelId: currentChannelId, username }));
        resetForm();
        setSubmitting(false);
        setIsFormEmpty(true);
      }}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = 'Поле обязательно для заполнения';
        }
        setIsFormEmpty(Object.keys(values).length === 0);
        return errors;
      }}
    >
      {({ errors, isSubmitting }) => (
        <Form noValidate className="py-1 border rounded-2">
          <div className={cn('input-group', { 'has-validation': isFormEmpty || errors.body || isSubmitting })}>
            <Field
              type="text"
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение…"
              className="border-0 p-0 ps-2 form-control"
              data-last-active-input
              autoFocus
            />
            <button type="submit" disabled={isFormEmpty || errors.body || isSubmitting} className="btn btn-group-vertical">
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
