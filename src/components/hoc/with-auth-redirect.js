import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const withAuthRedirect = (Component) => {
	const RedirectComponent = (props) => {
		return !props.isAuth ? <Redirect to="/login" /> : <Component {...props} />;
	};
	return connect(mapStateToProps, mapDispatchToProps)(RedirectComponent);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {};

export default withAuthRedirect;
