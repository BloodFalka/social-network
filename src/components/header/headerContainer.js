import React, { Component } from 'react';
import './header.scss';
import Header from './header';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
	componentDidMount() {}

	render() {
		return <Header isAuth={this.props.isAuth} />;
	}
}
const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
