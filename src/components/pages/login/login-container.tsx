import React, { FC } from 'react'
import Login from './login'
import { connect } from 'react-redux'
import { authLogin } from '../../../redux/reducers/auth-reducer'
import Spinner from '../../common/spinner/spinner'
import { selectIsAuth, selectCaptcha, selectIsShowingCaptcha } from '../../../redux/selectors/auth-selector'
import { AppStateType } from '../../../redux/store'
import { selectIsLoading } from '../../../redux/selectors/auth-selector'
import { LoginDataFormValuesType } from '../../../types/types'

type MapStatePropsType = {
    isLoading: boolean
    isAuth: boolean
    isShowingCaptcha: boolean
    captchaImg: string|null
}

type MapDispatchPropsType = {
    authLogin: (userLoginData:LoginDataFormValuesType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginContainer: FC<PropsType> = ({isLoading, authLogin, isAuth, isShowingCaptcha, captchaImg}) => {
	return isLoading ? (
		<Spinner />
	) : (
		<Login
			authLogin={authLogin}
			isAuth={isAuth}
			isShowingCaptcha={isShowingCaptcha}
			captchaImg={captchaImg}
		/>
	)
}

const mapStateToProps = (state:AppStateType) => ({
	isLoading: selectIsLoading(state),
	isAuth: selectIsAuth(state),
	isShowingCaptcha: selectIsShowingCaptcha(state),
	captchaImg: selectCaptcha(state),
})

const mapDispatchToProps = { authLogin }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(LoginContainer)
