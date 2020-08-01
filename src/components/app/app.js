import React from 'react';
import './app.scss';
import './upper-navigation.scss';
import Header from '../header';
import MainContent from '../main-content';

const UpperNavigation = (props) => {
	return (
		<div className="upper-navigation">
			<img
				className="logo"
				src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/da2e8612058573.56256be1b768a.png"
				alt="logo"
			/>
			{/* <Logo/> */}
		</div>
	);
};

const App = (props) => {
	return (
		<div className="app-wrapper">
			<UpperNavigation />
			<Header />
			<MainContent />
		</div>
	);
};

export default App;
