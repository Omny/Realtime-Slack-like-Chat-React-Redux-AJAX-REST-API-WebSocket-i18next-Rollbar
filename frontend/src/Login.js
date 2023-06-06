/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from './contexts';

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
    return { token: response.data.token, user: response.data.username };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserStatus } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      const { token, user } = await loginUsingApi(username, password);
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        setUserStatus('user');
        navigate('/');
      } else {
        formik.setFieldError('username', 'Неверные имя пользователя или пароль');
        formik.setFieldError('password', 'Неверные имя пользователя или пароль');
      }
    },
  });

  const { errors, touched } = formik;

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className={cn('form-control', {
            'is-invalid': errors.username && touched.username,
          })}
          data-last-active-input
        />
        <label className="form-label" htmlFor="username">
          Ваш ник
        </label>
        {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
      </div>
      <div className="form-floating mb-4">
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="current-password"
          required
          placeholder="Пароль"
          id="password"
          className={cn('form-control', {
            'is-invalid': errors.password && touched.password,
          })}
        />
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
        {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
      </div>
      <button
        type="submit"
        // disabled={errors.username || errors.password}
        className="w-100 mb-3 btn btn-outline-primary"
      >
        Войти
      </button>
    </form>
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
