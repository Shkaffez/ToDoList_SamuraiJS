import React, { Dispatch } from 'react';
import { Form, Field } from 'react-final-form';
import { emailValidator, Required, composeValidators } from '../validators/validators';
import { connect } from 'react-redux';
import { ActionTypes, Actions } from '../Redux/AuthReduser';
import Preloader from './common/preloader';
import { AppStateType } from '../Redux/ReduxStore'

const Login: React.FC<MapStateType & MapDispatchType> = (props) => {
  if(props.fetchingInProgress) {
    return <Preloader />
  }
  return <LoginForm {...props} />
}

const LoginForm: React.FC<MapStateType & MapDispatchType> = (props) => (
  <Form
    onSubmit={values => {
      props.fetchUser(values.email, values.password, values.rememberMe, undefined);
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

        <label>Remember Me</label>
        <Field name="rememberMe" component="input" type="checkbox" />

        <button type="submit" disabled={submitting || pristine}>submit</button>
        <button type="button" onClick={form.reset} disabled={submitting || pristine}>reset</button>

      </form>
    )}
  />
)

const MapStateToProps = (state : AppStateType) => {
  return {
    fetchingInProgress: state.auth.fetchingInProgress,
    email: state.auth.email,
    isAuth: state.auth.isAuth  
  }
}

const MapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
  return {
    
  }
}

export default connect<MapStateType, MapDispatchType, undefined, AppStateType>
(MapStateToProps, MapDispatchToProps)(Login)

type MapStateType = {
  email: string | null
  isAuth: boolean
  fetchingInProgress: boolean
}

type MapDispatchType = {  
  fetchUser: (email: string, password: string, rememberMe: boolean, captch: string | undefined) => void
}