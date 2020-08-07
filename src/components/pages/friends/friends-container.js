import React from 'react';
import { connect } from 'react-redux';
import Friends from './friends';
import withAuthRedirect from '../../hoc/with-auth-redirect';

const FriendsContainer = (props) => {
	return <Friends friends={props.friends} />;
};

const mapStateToProps = (state) => {
	return { friends: state.friendsPage.friends, isAuth: state.auth.isAuth };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAuthRedirect(FriendsContainer));
