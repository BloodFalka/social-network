import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Favicon from 'react-favicon';
import './index.scss';
import App from './components/app/app';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Favicon url="./favicon.ico" />
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
