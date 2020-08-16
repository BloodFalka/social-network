import React from 'react';
import './login.scss';
import Logo from '../../common/logo/logo';
import Button from '../../common/button';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { required, maxLengthCreator, minLengthCreator } from '../../../utils/validator';
import { Input, createField } from '../../common/forms-controls/forms-controls';

let maxLength15 = maxLengthCreator(30);
let minLength5 = minLengthCreator(5);

const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{createField([required, maxLength15, minLength5], 'Email', 'email', Input, { className: 'input email' })}
			{createField([required, maxLength15, minLength5], `Password`, 'password', Input, {
				className: 'input password',
				type: 'password',
			})}

			{props.isShowingCaptcha && (
				<div className="captcha">
					<img className="captcha-img" src={props.captcha} alt="captcha" />
					{createField([required], `Resolve Captcha`, 'captcha', Input, { className: 'input captcha' })}
				</div>
			)}
			{props.error && <div className="form-summary-error">{props.error}</div>}
			<label>
				{createField(null, null, 'rememberMe', Input, { className: 'input remember-me', type: 'checkbox' })}
				Remember me?
			</label>
			<Button text="SIGN IN" />
		</form>
	);
};

const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.authLogin(formData);
		debugger;
		console.log(formData);
	};

	return props.isAuth ? (
		<Redirect to="/profile" />
	) : (
		<div className="login">
			<Logo />
			<ReduxLoginForm
				onSubmit={onSubmit}
				isShowingCaptcha={props.isShowingCaptcha}
				captcha={props.captcha}
				error={props.error}
			/>
		</div>
	);
};

export default Login;
