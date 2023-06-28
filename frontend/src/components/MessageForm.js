import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { sendNewMessage } from '../slices/messagesSlice';

const MessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = localStorage.getItem('user');

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const handleAfterResponse = () => {
      resetForm();
    };

    setTimeout(() => {
      const { body } = values;
      dispatch(sendNewMessage({
        body,
        channelId: currentChannelId,
        username,
        callback: handleAfterResponse,
      }));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = t('messages.required');
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
              aria-label={t('messages.required')}
              placeholder={t('messages.enter')}
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
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
