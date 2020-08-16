import React from 'react';
import './header.scss';
import Header from './header';
import { updateTerm, requestUsers } from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

const HeaderContainer = (props) => {
	return <Header {...props} />;
};
const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, searchTerm: state.searchPage.searchTerm });

const mapDispatchToProps = { updateTerm, requestUsers };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
