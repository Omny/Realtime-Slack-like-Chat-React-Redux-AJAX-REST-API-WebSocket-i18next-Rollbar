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
import Button from 'react-bootstrap/Button';
import AppContext from '../contexts';
import routes from '../routes';
import registrationImg from '../images/registration.jpg';

const LoginForm = () => {
  const { handleLogin } = useContext(AppContext);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимум 6 символов')
      // .max(50, 'Максимум 50 символов')
      // .matches(/\d+/, 'Одна или более цифра')
      .required('Обязательное поле'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
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
            setFieldError('username', 'Такой пользователь уже существует');
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autoComplete="username"
              required
              placeholder="Ваш ник"
              id="username"
              className={cn('form-control', {
                'is-invalid': (errors.username && touched.username),
              })}
              data-last-active-input
              autoFocus
            />
            <label className="form-label" htmlFor="username">
              Ваш ник
            </label>
            <ErrorMessage name="username" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
              id="password"
              className={cn('form-control', {
                'is-invalid': (errors.password && touched.password),
              })}
            />
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <ErrorMessage name="password" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
              required
              placeholder="Подтвердите пароль"
              id="passwordConfirm"
              className={cn('form-control', {
                'is-invalid': (errors.passwordConfirm && touched.passwordConfirm),
              })}
            />
            <label className="form-label" htmlFor="passwordConfirm">
              Подтвердите пароль
            </label>
            <ErrorMessage name="passwordConfirm" component="div" className="invalid-tooltip" />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outline-primary"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={registrationImg} className="rounded-circle" alt="signup" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Есть аккаунт?</span>
              {' '}
              <a href="/login">Войти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
