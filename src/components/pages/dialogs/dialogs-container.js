import React from 'react';
import './dialogs.scss';

import { connect } from 'react-redux';
import Dialogs from './dialogs';
import withAuthRedirect from '../../hoc/with-auth-redirect';
import { compose } from 'redux';

const DialogsContainer = (props) => {
	return <Dialogs dialogs={props.dialogs} />;
};
const mapStateToProps = (state) => {
	return { dialogs: state.messagePage.dialogs, isAuth: state.auth.isAuth };
};
const mapDispatchToProps = (dispatch) => ({});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(DialogsContainer);
