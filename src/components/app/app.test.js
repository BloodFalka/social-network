import React from 'react';
import ReactDOM from 'react-dom';
import DeadSocialApp from './app';

it('render App without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<DeadSocialApp />, div);
	ReactDOM.unmountComponentAtNode(div);
});
