import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './main-content.scss';
import ProfileContainer from '../pages/profile/profile-container';
import LoginContainer from '../pages/login/login-container';
import Dialogs from '../pages/dialogs';
import Friends from '../pages/friends';
import NewPostContainer from '../pages/new-post';
import Search from '../pages/search';

const MainContent = (props) => {
	return (
		<div className="content">
			<div className="container">
				<Switch>
					<Route path="/profile/:userId?" render={() => <ProfileContainer />} />{' '}
					<Route path="/login" render={() => <LoginContainer />} />
					<Route path="/dialogs" render={() => <Dialogs />} />
					<Route path="/friends" render={() => <Friends />} />
					<Route path="/add-post" render={() => <NewPostContainer />} />
					<Route path="/search" render={() => <Search />} />
				</Switch>
			</div>
		</div>
	);
};

export default MainContent;
