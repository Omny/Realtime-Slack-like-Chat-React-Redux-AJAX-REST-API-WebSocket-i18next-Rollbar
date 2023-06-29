import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { sendNewMessage } from '../slices/messagesSlice';

const MessageForm = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language;
    leoProfanity.loadDictionary(currentLanguage);
  }, [i18n.language]);

  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = localStorage.getItem('user');

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const handleAfterResponse = () => {
      resetForm();
    };

    setTimeout(() => {
      const cleanedBody = leoProfanity.clean(values.body);

      dispatch(
        sendNewMessage({
          body: cleanedBody,
          channelId: currentChannelId,
          username,
          callback: handleAfterResponse,
        }),
      );
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
              aria-label={t('messages.newMessage')}
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
