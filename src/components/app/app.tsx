import React, { FC, useEffect, useState } from 'react'
import './app.scss'
import MainContent from '../main-content/main-content'
import { initializeApp } from '../../redux/reducers/app-reducer'
import { withRouter, BrowserRouter as Router } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Spinner from '../common/spinner/spinner'
import Favicon from 'react-favicon'
import store, { AppStateType } from '../../redux/store'
import UpperNavigation from '../header/upper-navigation/upper-navigation'
import { selectInitialized } from '../../redux/selectors/app-selector'
import HeaderContainer from '../header/header-container'
import ErrorPopup from '../error-popup/error-popup'

type MapDispatchPropsType = {
	initializeApp: () => void,
}

type MapStatePropsType = {
	initialized: boolean,
}

type PropsType = MapDispatchPropsType & MapStatePropsType

const App: FC<PropsType> = ({ initializeApp, initialized }) => {
	const [error, setError] = useState(false)

	useEffect(() => {
		initializeApp()
		window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
		return () => {
			window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
		}
		// eslint-disable-next-line
	}, [])

	const catchAllUnhandledErrors = () => {
		setError(true)
	}

	return initialized ? (
		<div className="app-wrapper">
			{error && <ErrorPopup errorText={'Some Error ocurred, please reload page'} />}
			<UpperNavigation />
			<HeaderContainer />
			<MainContent />
		</div>
	) : (
		<Spinner />
	)
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: selectInitialized(state),
})

const mapDispatchToProps = { initializeApp }

const AppContainer = compose<React.ComponentType>(
	withRouter,
	connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(App)

const DeadSocialApp = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Favicon url="./favicon.ico" />
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</Router>
	)
}

export default DeadSocialApp
