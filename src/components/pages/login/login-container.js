import React, { Component } from 'react';
import Login from './login';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../../redux/reducers/auth-reducer';
import Spinner from '../../common/spinner/spinner';
import { Redirect } from 'react-router';

class LoginContainer extends Component {
	state = {
		redirect: false,
	};

	componentDidMount() {
		this.props.getAuthUserData();

		this.setState({
			redirect: true,
		});
	}

	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : this.state.redirect ? (
			<Redirect to="/profile" />
		) : (
			<Login />
		);
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = { getAuthUserData };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
