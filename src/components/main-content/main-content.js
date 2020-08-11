import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './main-content.scss';
import LoginContainer from '../pages/login/login-container';
import withSuspence from '../hoc/with-suspence';

const ProfileContainer = React.lazy(() =>
	import('../pages/profile/profile-container')
);
const DialogsContainer = React.lazy(() =>
	import('../pages/dialogs/dialogs-container')
);
const FriendsContainer = React.lazy(() =>
	import('../pages/friends/friends-container')
);
const NewPostContainer = React.lazy(() => import('../pages/new-post'));
const Search = React.lazy(() => import('../pages/search'));

const MainContent = (props) => {
	return (
		<div className="content">
			<div className="container">
				<Switch>
					<Route
						path="/profile/:userId?"
						render={withSuspence(ProfileContainer)}
					/>{' '}
					<Route path="/login" render={withSuspence(LoginContainer)} />
					<Route path="/dialogs" render={withSuspence(DialogsContainer)} />
					<Route path="/friends" render={withSuspence(FriendsContainer)} />
					<Route path="/add-post" render={withSuspence(NewPostContainer)} />
					<Route path="/search" render={withSuspence(Search)} />
				</Switch>
			</div>
		</div>
	);
};

export default MainContent;
