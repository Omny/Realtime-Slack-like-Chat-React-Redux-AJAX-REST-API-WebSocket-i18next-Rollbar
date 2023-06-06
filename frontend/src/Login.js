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
import { useNavigate } from 'react-router-dom';

import loginImg from './login.jpg';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    // .min(3, 'Минимум 3 символа')
    // .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    // .min(6, 'Минимум 6 символов')
    // .max(50, 'Максимум 50 символов')
    // .matches(/\d+/, 'Одна или более цифра')
    .required('Обязательное поле'),
});

const loginUsingApi = async (username, password) => {
  try {
    console.log(username, password);
    const response = await axios.post('/api/v1/login', { username, password });
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      if (await loginUsingApi(username, password)) {
        navigate('/');
      }
    } catch (error) {
      console.log('Неверные имя пользователя или пароль');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autoComplete="username"
              required
              placeholder="Ваш ник"
              id="username"
              className={cn('form-control', {
                'is-invalid': errors.username && touched.username,
              })}
              data-last-active-input
              autoFocus
            />
            <label className="form-label" htmlFor="username">Ваш ник</label>
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
                'is-invalid': errors.password && touched.password,
              })}
            />
            <label className="form-label" htmlFor="password">Пароль</label>
            <ErrorMessage name="password" component="div" className="invalid-tooltip" />
          </div>
          <button
            type="submit"
            // disabled={errors.username || errors.password}
            className="w-100 mb-3 btn btn-outline-primary"
          >
            Войти
          </button>
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
              <img src={loginImg} className="rounded-circle" alt="Войти" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              {' '}
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
