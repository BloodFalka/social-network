import React, { Component } from 'react';
import Login from './login';
import { connect } from 'react-redux';
import { authLogin } from '../../../redux/reducers/auth-reducer.ts';
import Spinner from '../../common/spinner/spinner';

class LoginContainer extends Component {
	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : (
			<Login
				authLogin={this.props.authLogin}
				isAuth={this.props.isAuth}
				isShowingCaptcha={this.props.isShowingCaptcha}
				captcha={this.props.captcha}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
	isAuth: state.auth.isAuth,
	isShowingCaptcha: state.auth.isShowingCaptcha,
	captcha: state.auth.captcha,
});

const mapDispatchToProps = { authLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
