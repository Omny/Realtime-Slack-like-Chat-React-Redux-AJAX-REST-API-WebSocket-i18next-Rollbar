import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import socketManager from '../socketManager';

const AddChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  useEffect(() => {
    const input = document.querySelector('[name="name"]');
    if (input) {
      input.focus();
    }
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    const handleAfterResponse = (response) => {
      if (response.status === 'ok') {
        dispatch(setCurrentChannelId(response.data.id));
        toast.success(t('channels.created'));
      }
      handleClose();
    };
    const payload = { name: values.name };
    socketManager.emit('newChannel', payload, handleAfterResponse);
    setSubmitting(false);
  };

  const ChannelsSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .min(3, t('modals.passMin3'))
      .max(20, t('modals.passMax20'))
      .required(t('modals.required'))
      .test('unique', t('modals.uniq'), (value) => !channels.some((channel) => channel.name === value)),
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleSubmit}
      validationSchema={ChannelsSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Form noValidate className="py-1">
          <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
            <Field
              type="text"
              name="name"
              id="name"
              value={values.name}
              aria-label={t('modals.channelName')}
              placeholder={t('modals.enterChannelName')}
              className={cn('mb-4 form-control', { 'is-invalid': (errors.name && touched.name) })}
              data-last-active-input
              autoFocus
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <ErrorMessage name="name" component="div" className="invalid-tooltip" />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button type="button" variant="secondary" className="me-2" onClick={handleClose}>{t('modals.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting} variant="primary" default>{t('modals.submit')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;
