import React from 'react';
import { Form, Field } from 'react-final-form';
import { emailValidator, Required, composeValidators } from '../validators/validators';
import { connect } from 'react-redux';
import { login } from '../Redux/AuthReduser';
import Preloader from './common/preloader';
import { AppStateType } from '../Redux/ReduxStore';
import { FORM_ERROR } from 'final-form';
import { Button } from 'antd';
import "antd/dist/antd.css";
import { Redirect } from 'react-router';

const Login: React.FC<MapStateType & MapDispatchType> = (props) => {
  if(props.isAuth) {
    return <Redirect to="/main" />;
  }
  if(props.fetchingInProgress) {
    return <Preloader />
  }
  return <LoginForm {...props} />
}

const LoginForm: React.FC<MapStateType & MapDispatchType> = (props) => (
  <Form
    onSubmit={values => {
      props.login(values.email, values.password, values.rememberMe, values.captcha);
      return { [FORM_ERROR]: props.loginError }
    }}
    render={({ handleSubmit, form, submitting, pristine, submitError }) => (
      <form onSubmit={handleSubmit}>
        <Field name="email" component="input" validate={composeValidators(emailValidator, Required)}>
          {({ input, meta }) => (
            <div>
              <input {...input} type="text" placeholder="email" />
              {(meta.error || meta.submitError) && meta.touched && (
                <span>{meta.error || meta.submitError}</span>
              )}
            </div>
          )}
        </Field>

        <Field name="password" component="input" validate={Required}>
          {({ input, meta }) => (
            <div>
              <input {...input} type="text" placeholder="password" />
              {(meta.error || meta.submitError) && meta.touched && (
                <span>{meta.error || meta.submitError}</span>
              )}
            </div>
          )}
        </Field>
        
        {submitError && <div>{submitError}</div>}

        <label>Remember Me</label>
        <Field name="rememberMe" component="input" type="checkbox" />

        <Button type="primary" style={{ margin: 8 }} onClick={form.submit} disabled={submitting || pristine}>submit</Button>
        <Button type="default" onClick={form.reset} disabled={submitting || pristine}>reset</Button>

        {props.captchaUrl ? <img src={props.captchaUrl.toString()} alt="captcha" /> : undefined}
        {props.captchaUrl ? <div>
          <Field name="captcha" component="input" type="text" />symbols from image
        </div> : undefined}
      </form>
    )}
  />
)

const MapStateToProps = (state : AppStateType) => {
  return {
    fetchingInProgress: state.auth.fetchingInProgress,
    email: state.auth.email,
    isAuth: state.auth.isAuth,
    loginError: state.auth.loginError,
    captchaUrl: state.auth.captchaUrl,
  }
}

type MapStateType = {
  email: string | null
  isAuth: boolean
  fetchingInProgress: boolean
  loginError: string | null
  captchaUrl: string | null
}

type MapDispatchType = {  
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


export default connect<MapStateType, MapDispatchType, undefined, AppStateType>
(MapStateToProps, { login })(Login)
