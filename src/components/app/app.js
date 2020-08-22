import React, { Component } from 'react'
import './app.scss'
import HeaderContainer from '../header/headerContainer'
import MainContent from '../main-content'
import { initializeApp } from '../../redux/reducers/app-reducer.ts'
import { withRouter, BrowserRouter as Router } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Spinner from '../common/spinner/spinner'
import Favicon from 'react-favicon'
import store from '../../redux/store'
import UpperNavigation from '../header/upper-navigation/upper-navigation'
import { selectInitialized } from '../../redux/selectors/app-selector'

class App extends Component {
	componentDidMount() {
		this.props.initializeApp()
	}
	render() {
		return this.props.initialized ? (
			<div className="app-wrapper">
				<UpperNavigation />
				<HeaderContainer />
				<MainContent />
			</div>
		) : (
			<Spinner />
		)
	}
}

const mapStateToProps = (state) => ({
	initialized: selectInitialized(state),
})

const mapDispatchToProps = { initializeApp }

const AppContainer = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
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
