/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import AppContext from '../contexts';
import routes from '../routes';
import registrationImg from '../images/registration.jpg';

const SignupForm = () => {
  const { t } = useTranslation();
  const { handleLogin } = useContext(AppContext);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, t('signup.passMin3'))
      .max(20, t('signup.passMax20'))
      .required(t('signup.required')),
    password: Yup.string()
      .trim()
      .min(6, t('signup.passMin6'))
      .required(t('signup.required')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.mustMatch')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const { username, password } = values;
        console.log(username, password);
        try {
          const response = await axios.post(routes.signupPath(), { username, password });
          console.log(response);
          handleLogin(response.data.username, response.data.token);
        } catch (error) {
          console.log(error);
          if (error.response?.status === 409) {
            setFieldError('username', t('signup.alreadyExists'));
            setSubmitting(false);
            return;
          }
          if (error.isAxiosError) {
            toast.error(t('errors.network'));
          } else {
            toast.error(t('errors.unknown'));
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">
            {t('signup.title')}
          </h1>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autoComplete="username"
              required
              placeholder={t('signup.username')}
              id="username"
              className={cn('form-control', {
                'is-invalid': (errors.username && touched.username),
              })}
              data-last-active-input
              autoFocus
            />
            <label className="form-label" htmlFor="username">
              {t('signup.username')}
            </label>
            <ErrorMessage name="username" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('signup.password')}
              id="password"
              className={cn('form-control', { 'is-invalid': (errors.password && touched.password) })}
            />
            <label className="form-label" htmlFor="password">
              {t('signup.password')}
            </label>
            <ErrorMessage name="password" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
              required
              placeholder={t('signup.confirm')}
              id="passwordConfirm"
              className={cn('form-control', { 'is-invalid': (errors.passwordConfirm && touched.passwordConfirm) })}
            />
            <label className="form-label" htmlFor="passwordConfirm">
              {t('signup.confirm')}
            </label>
            <ErrorMessage name="passwordConfirm" component="div" className="invalid-tooltip" />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outline-primary"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            {t('signup.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={registrationImg} className="rounded-circle" alt="signup" />
              </div>
              <SignupForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('signup.alreadyHaveAccount')}
                </span>
                {' '}
                <a href="/login">
                  {t('signup.login')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
