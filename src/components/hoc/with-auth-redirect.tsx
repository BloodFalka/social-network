import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { selectIsAuth } from '../../redux/selectors/auth-selector'

type MapStatePropsType = {
	isAuth: boolean,
}

function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
		let { isAuth, ...restProps } = props
		return !props.isAuth ? <Redirect to="/login" /> : <WrappedComponent {...restProps as WCP} />
	}
	return connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent)
}

const mapStateToProps = (state: AppStateType) => ({
	isAuth: selectIsAuth(state),
})

export default withAuthRedirect
