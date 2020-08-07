import React, { Component } from 'react';
import './login.scss';
import Logo from '../../common/logo/logo';
import Button from '../../common/button';

const Login = (props) => {
	return (
		<div className="login">
			<Logo />
			<form action="">
				<input className="input nickname" type="text" />
				<input className="input password" type="text" />
			</form>
			<Button text="SIGN IN" />
		</div>
	);
};

export default Login;
