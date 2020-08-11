import React from 'react';
import spinner from '../../../img/spinner.png';
import './spinner.scss';

const Spinner = (props) => {
	return (
		<div className="spinner">
			<img src={spinner} alt="spinner" />
		</div>
	);
};

export default Spinner;
