import React, { Component } from 'react';
import Users from './users';
import { requestUsers, setFollow, setUnfollow } from '../../../../redux/reducers/users-reducer';
import { connect } from 'react-redux';
import Spinner from '../../../common/spinner/spinner';
import { compose } from 'redux';
import {
	getUsers,
	getPageSize,
	getTotalUsersCount,
	getCurrentPage,
	getIsError,
	getIsFollowingProgress,
	getIsLoading,
} from '../../../../redux/selectors/users-selector';
import { getIsAuth } from '../../../../redux/selectors/auth-selector';

class UsersContainer extends Component {
	componentDidMount() {
		this.props.requestUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage);
	}

	onPreviousPageClick = () => {
		this.props.requestUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage, 'prev');
	};

	onNextPageClick = () => {
		this.props.requestUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage, 'next');
	};

	onFollow = (id) => {
		this.props.setFollow(id);
	};

	onUnfollow = (id) => {
		this.props.setUnfollow(id);
	};

	render() {
		const { isLoading, isFollowingProgress, isError, users, totalUsersCount, pageSize, currentPage } = this.props;

		return isError ? (
			<img src="https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png" alt="Error" />
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
				isAuth={this.props.isAuth}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	users: getUsers(state),
	pageSize: getPageSize(state),
	totalUsersCount: getTotalUsersCount(state),
	currentPage: getCurrentPage(state),
	isLoading: getIsLoading(state),
	isFollowingProgress: getIsFollowingProgress(state),
	isError: getIsError(state),
	isAuth: getIsAuth(state),
});

const mapDispatchToProps = {
	requestUsers,
	setFollow,
	setUnfollow,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(UsersContainer);
