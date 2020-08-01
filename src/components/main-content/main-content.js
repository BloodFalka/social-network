import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './main-content.scss';
import Profile from '../pages/profile';
import Dialogs from '../pages/dialogs';
import Friends from '../pages/friends';
import NewPostContainer from '../pages/new-post';

const MainContent = (props) => {
	return (
		<div className="content">
			<div className="container">
				<Switch>
					<Route path="/profile" render={() => <Profile />} />
					<Route path="/dialogs" render={() => <Dialogs />} />
					<Route path="/friends" render={() => <Friends />} />
					<Route path="/add-post" render={() => <NewPostContainer />} />
				</Switch>
			</div>
		</div>
	);
};

export default MainContent;
