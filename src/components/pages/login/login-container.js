import React, { Component } from 'react';
import Login from './login';
import { connect } from 'react-redux';
import {
	setUserData,
	toggleLoading,
} from '../../../redux/reducers/auth-reducer';
import Spinner from '../../common/spinner/spinner';
import { Redirect } from 'react-router';
import { authAPI } from '../../../api';

class LoginContainer extends Component {
	state = {
		redirect: false,
	};

	componentDidMount() {
		this.props.toggleLoading(true);

		authAPI.getAuth().then((data) => {
			if (data.resultCode === 0) {
				const { id, email, login } = data.data;
				this.props.toggleLoading(false);
				this.props.setUserData(id, email, login);
				this.setState({
					redirect: true,
				});
			}
		});
	}

	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : this.state.redirect ? (
			<Redirect push to="/profile" />
		) : (
			<Login />
		);
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = { setUserData, toggleLoading };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
