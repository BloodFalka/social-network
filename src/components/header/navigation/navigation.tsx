import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.scss'

type PropsType = {
	isAuth: boolean,
}

const Navigation: FC<PropsType> = ({ isAuth }) => {
	return (
		<nav className="nav">
			<NavLink to={isAuth ? '/profile' : '/login'}>
				<svg viewBox="0 0 15 18.9" width="20" height="26" fill="white">
					<path d="M7.5 8.8c2.6 0 4.7-2 4.7-4.4S10.1 0 7.5 0 2.8 2 2.8 4.4C2.9 6.8 5 8.8 7.5 8.8zm0 1.5c-4.2 0-7.5 3.2-7.5 7.4 0 .6.5 1.2 1.2 1.2h12.6c.7 0 1.2-.5 1.2-1.2 0-4.1-3.3-7.4-7.5-7.4z"></path>
				</svg>
			</NavLink>
			<NavLink to="/dialogs">
				<svg viewBox="0 0 23 16.9" width="28" height="26">
					<path d="M20.9 0H2.1C.6 0 0 .7 0 2.2v12.5c0 1.6.6 2.2 2.1 2.2h18.8c1.5 0 2.1-.7 2.1-2.2V2.2C23 .7 22.4 0 20.9 0zm.4 13.6c.3.3-.2.8-.5 1.1-.1.2-.3.5-.5.5s-.2.1-.3-.1l-5.5-5-.6.5c-.7.6-1.6 1.1-2.4 1.1-.9 0-1.7-.4-2.4-1.1l-.6-.6-5.2 4.8c-.1.1-.3.2-.5.2s-.4-.1-.5-.2c-.3-.3-.8-1-.5-1.3l5.1-4.9-5-5c-.3-.3.1-.8.3-1.1.3-.3.8-.4 1.1-.2L10 8.9c.4.4.9.8 1.4.9.6 0 1.1-.4 1.6-.9l6.6-6.7c.3-.3.9 0 1.2.3.3.3.4 1 .2 1.2l-4.9 4.8 5.2 5.1z"></path>
				</svg>
			</NavLink>
			<NavLink to="/friends">
				<svg width="27" height="27" viewBox="0 0 21 21" fill="#ffffff">
					<path d="M10.5 0C4.7 0 0 4.722 0 10.55c0 2.21.7 4.22 1.8 5.828l-.7 4.12 4.5-.704C7.1 20.598 8.8 21 10.5 21 16.3 21 21 16.278 21 10.45S16.3 0 10.5 0zM5.9 7.636c0-.904.8-1.708 1.7-1.708.9 0 1.7.804 1.7 1.708 0 .905-.8 1.708-1.7 1.708-.9 0-1.7-.803-1.7-1.708zm4.6 8.44c-2.1 0-3.9-1.105-4.6-2.712-.3-.603.3-1.307 1.1-1.307h6.8c.8 0 1.4.704 1.1 1.307-.5 1.607-2.3 2.713-4.4 2.713zm2.9-6.832c-.9 0-1.7-.804-1.7-1.708 0-.904.8-1.708 1.7-1.708.9 0 1.7.804 1.7 1.708 0 .904-.7 1.708-1.7 1.708z"></path>
				</svg>
			</NavLink>
			<NavLink to="/add-post">
				<div className="add-new-post">
					<svg viewBox="0 0 16.8 16.8" width="25" height="25">
						<path d="M1.2 11.9l-1.2 5 5-1.2 8.2-8.2-3.8-3.8-8.2 8.2zM10 6.3l-6.2 6.2-.6-.6 6.2-6.2c0-.1.6.6.6.6zM13.1 0l-2.5 2.5 3.7 3.7 2.5-2.5L13.1 0z"></path>
					</svg>
				</div>
			</NavLink>

			{/* 
                <NavLink to="/news">News</NavLink>
                <NavLink to="/music">Music</NavLink>
                <NavLink to="/settings">Settings</NavLink> */}
		</nav>
	)
}

export default Navigation
