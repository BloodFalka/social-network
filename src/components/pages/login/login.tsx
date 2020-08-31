import React, { FC } from 'react'
import './login.scss'
import Logo from '../../common/logo/logo'
import Button from '../../common/button/button'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { required, maxLengthCreator, minLengthCreator } from '../../../utils/validator'
import { Input, createField, ExtractStringKeys } from '../../common/forms-controls/forms-controls'
import { LoginDataFormValuesType as LoginDataValues } from '../../../types/types'

const maxLength15 = maxLengthCreator(30)
const minLength5 = minLengthCreator(5)

type LoginFormOwnProps = {
	isShowingCaptcha: boolean
	captchaImg: string|null
}

type LoginFormValuesKeys = ExtractStringKeys<LoginDataValues>

const LoginForm:FC<InjectedFormProps<LoginDataValues, LoginFormOwnProps>& LoginFormOwnProps> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{createField<LoginFormValuesKeys>([required, maxLength15, minLength5], 'Email', 'email', Input, {
				className: 'input email',
			})}
			{createField<LoginFormValuesKeys>([required, maxLength15, minLength5], `Password`, 'password', Input, {
				className: 'input password',
				type: 'password',
			})}

			{props.isShowingCaptcha && (
				<div className="captcha">
					<img className="captcha-img" src={props.captchaImg||undefined} alt="captcha" />
					{createField<LoginFormValuesKeys>([required], `Resolve Captcha`, 'captcha', Input, {
						className: 'input captcha',
					})}
				</div>
			)}
			{props.error && <div className="form-summary-error">{props.error}</div>}
			<label>
				{createField<LoginFormValuesKeys>([], undefined, 'rememberMe', Input, {
					className: 'input remember-me',
					type: 'checkbox',
				})}
				Remember me?
			</label>
			<Button text="SIGN IN" />
		</form>
	)
}

const ReduxLoginForm = reduxForm<LoginDataValues, LoginFormOwnProps>({ form: 'login' })(LoginForm)

type LoginPropsType = {
	authLogin: (userLoginData:LoginDataValues) => void
	isAuth: boolean
	isShowingCaptcha: boolean
	captchaImg: string|null
}

const Login:FC<LoginPropsType> = (props) => {
	const onSubmit = (formData: LoginDataValues) => {
		props.authLogin(formData)
	}

	return props.isAuth ? (
		<Redirect to="/profile" />
	) : (
		<div className="login">
			<Logo />
			<ReduxLoginForm
				onSubmit={onSubmit}
				isShowingCaptcha={props.isShowingCaptcha}
				captchaImg={props.captchaImg}
			/>
		</div>
	)
}

export default Login
