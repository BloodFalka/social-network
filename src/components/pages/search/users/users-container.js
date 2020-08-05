import React, { Component } from 'react';
import Users from './users';
import {
	unfollow,
	follow,
	setPreviousPage,
	setNextPage,
	setTotalUsersCount,
	toggleLoading,
	toggleFollowingProgress,
	toggleError,
	getUsers,
	setFollow,
	setUnfollow,
} from '../../../../redux/reducers/users-reducer';
import { connect } from 'react-redux';
import Spinner from '../../../common/spinner/spinner';

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
				onPreviousPageClick={this.onPreviousPageClick}
				onNextPageClick={this.onNextPageClick}
				isLoading={isLoading}
				isFollowingProgress={isFollowingProgress}
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
	isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
	getUsers,
	setFollow,
	setUnfollow,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
