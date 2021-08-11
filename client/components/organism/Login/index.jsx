import React from 'react';
import Router from 'next/router';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
// Utils
import { ApiPost } from '../../../utils/API';
// Components
import ButtonSubmit from '../../atom/ButtonSubmit';
import Field from '../../utils/Field';
// Styles
import styles from './Login.module.scss';

const userLogin = async ({ Email, Password }) => {
  return ApiPost('login', { email: Email, password: Password });
};

const getLoginSchema = () =>
  Yup.object().shape({
    Email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
    Password: Yup.string().required('Please enter your password')
  });

const submitForm = async (values, actions) => {
  const results = await userLogin({
    Email: values.Email,
    Password: values.Password
  });

  actions.setSubmitting(false); // Finish submitting
  if (results.status === 204) {
    Router.push('/'); // Redirect to homepage
  }
};

const Login = () => {
  const initValues = {
    Email: '',
    Password: ''
  };

  return (
    <div className={styles.Login}>
      <Formik
        initialValues={initValues}
        validationSchema={getLoginSchema}
        onSubmit={async (values, actions) => submitForm(values, actions)}
      >
        <Form id="LoginForm" className={styles.LoginForm}>
          <div className={styles.LoginFormFields}>
            <Field
              type="email"
              item={{
                name: 'Email',
                label: 'Email Address',
                placeholder: 'Email Address'
              }}
            />
            <Field
              type="password"
              item={{
                name: 'Password',
                label: 'Password',
                placeholder: 'Password'
              }}
            />
          </div>
          <Link href="/">
            <a>Forgotten your password?</a>
          </Link>
          <ButtonSubmit id="SignInSubmit" className={styles.ButtonSubmit}>
            Sign In
          </ButtonSubmit>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
