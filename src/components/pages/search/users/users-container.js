import React, { Component } from 'react';
import Users from './users';
import {
	getUsers,
	setFollow,
	setUnfollow,
} from '../../../../redux/reducers/users-reducer';
import { connect } from 'react-redux';
import Spinner from '../../../common/spinner/spinner';
import { compose } from 'redux';
import withAuthRedirect from '../../../hoc/with-auth-redirect';

class UsersContainer extends Component {
	componentDidMount() {
		this.props.getUsers(
			this.props.totalUsersCount,
			this.props.pageSize,
			this.props.currentPage
		);
	}

	onPreviousPageClick = () => {
		this.props.getUsers(
			this.props.totalUsersCount,
			this.props.pageSize,
			this.props.currentPage,
			'prev'
		);
	};

	onNextPageClick = () => {
		this.props.getUsers(
			this.props.totalUsersCount,
			this.props.pageSize,
			this.props.currentPage,
			'next'
		);
	};

	onFollow = (id) => {
		this.props.setFollow(id);
	};

	onUnfollow = (id) => {
		this.props.setUnfollow(id);
	};

	render() {
		const {
			isLoading,
			isFollowingProgress,
			isError,
			users,
			totalUsersCount,
			pageSize,
			currentPage,
		} = this.props;

		return isError ? (
			<img
				src="https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png"
				alt="Error"
			/>
		) : isLoading ? (
			<Spinner />
		) : (
			<Users
				users={users}
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onUnfollow={this.onUnfollow}
				onFollow={this.onFollow}
				isFollowingProgress={isFollowingProgress}
				onPreviousPageClick={this.onPreviousPageClick}
				onNextPageClick={this.onNextPageClick}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.searchPage.users,
	pageSize: state.searchPage.pageSize,
	totalUsersCount: state.searchPage.totalUsersCount,
	currentPage: state.searchPage.currentPage,
	isLoading: state.searchPage.isLoading,
	isFollowingProgress: state.searchPage.isFollowingProgress,
	isError: state.searchPage.isError,
});

const mapDispatchToProps = {
	getUsers,
	setFollow,
	setUnfollow,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(UsersContainer);
