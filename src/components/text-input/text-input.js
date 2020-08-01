import React from 'react';
import './text-input.scss';

const TextInput = (props) => {
	return (
		<div className="text-input">
			<textarea
				onChange={props.onChange}
				value={props.value}
				className="text-field"
				ref={props.ref}
			></textarea>
		</div>
	);
};

export default TextInput;
