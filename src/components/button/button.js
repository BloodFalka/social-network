import React from 'react';
import './button.scss';

const Button = (props) => {
	const { onClick, text, disabled } = props;
	const color = { backgroundColor: `${props.color}` };
	return (
		<div>
			<button
				onClick={onClick}
				className="button"
				style={color}
				disabled={disabled}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
