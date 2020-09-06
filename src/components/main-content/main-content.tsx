import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './main-content.scss'
import withSuspence from '../hoc/with-suspence'

const ProfileContainer = React.lazy(() => import('../pages/profile/profile-container'))
const NewPostContainer = React.lazy(() => import('../pages/new-post/new-post-container'))
const LoginContainer = React.lazy(() => import('../pages/login/login-container'))
const DialogsContainer = React.lazy(() => import('../pages/dialogs/dialogs-container'))
const FriendsContainer = React.lazy(() => import('../pages/friends/friends-container'))
const Search = React.lazy(() => import('../pages/search/search'))
const Page404 = React.lazy(() => import('../pages/page-404/page-404'))

const SuspendedProfile = withSuspence(ProfileContainer),
	SuspendedDialogs = withSuspence(DialogsContainer),
	SuspendedNewPost = withSuspence(NewPostContainer),
	SuspendedLogin = withSuspence(LoginContainer),
	SuspendedFriends = withSuspence(FriendsContainer),
	SuspendedSearch = withSuspence(Search),
	SuspendedPage404 = withSuspence(Page404)

const MainContent = () => {
	return (
		<div className="content">
			<div className="container">
				<Switch>
					<Route exact path="/" render={() => <Redirect from="/" to="/profile" />} />
					<Route path="/profile/:userId?" render={SuspendedProfile} />
					<Route path="/login" render={SuspendedLogin} />
					<Route path="/dialogs" render={SuspendedDialogs} />
					<Route path="/friends" render={SuspendedFriends} />
					<Route path="/add-post" render={SuspendedNewPost} />
					<Route path="/search" render={SuspendedSearch} />
					<Route path="*" render={SuspendedPage404} />
				</Switch>
			</div>
		</div>
	)
}

export default MainContent
