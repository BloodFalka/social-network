import React, { FC } from 'react'
import Login from './login'
import { connect } from 'react-redux'
import { authLogin } from '../../../redux/reducers/auth-reducer'
import Spinner from '../../common/spinner/spinner'
import { selectIsAuth, selectCaptcha, selectIsShowingCaptcha } from '../../../redux/selectors/auth-selector'
import { AppStateType } from '../../../redux/store'
import { selectIsLoading } from '../../../redux/selectors/auth-selector'
import { LoginDataFormValuesType } from '../../../types/types'
import { getFormSubmitErrors, FormErrors, reset } from 'redux-form'

type MapStatePropsType = {
    isLoading: boolean
    isAuth: boolean
    isShowingCaptcha: boolean
	captchaImg: string|null
	submitErrors: FormErrors<{}, string>;
}

type MapDispatchPropsType = {
	authLogin: (userLoginData:LoginDataFormValuesType) => void
	reset: (form: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginContainer: FC<PropsType> = ({isLoading, authLogin, isAuth, isShowingCaptcha, captchaImg, submitErrors, reset}) => {
	//@ts-ignore
	return isLoading&&!submitErrors.error ? (
		<Spinner />
	) : (
	<Login
			authLogin={authLogin}
			reset={reset}
			isAuth={isAuth}
			isShowingCaptcha={isShowingCaptcha}
			captchaImg={captchaImg}
			submitErrors={submitErrors}
		/>
	)
}

const mapStateToProps = (state:AppStateType) => ({
	isLoading: selectIsLoading(state),
	isAuth: selectIsAuth(state),
	isShowingCaptcha: selectIsShowingCaptcha(state),
	captchaImg: selectCaptcha(state),
	submitErrors: getFormSubmitErrors('login')(state)
})

const mapDispatchToProps = { authLogin, reset }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(LoginContainer)
