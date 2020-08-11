import React from 'react';
import './form-control.scss';
import { Field } from 'redux-form';

export const Input = ({ input, meta, ...props }) => {
	const isError = meta.error && meta.touched;
	return (
		<div className={`form-control ${isError && 'error'}`}>
			<div>
				<input {...props} {...input}></input>
			</div>
			{isError && <div className="error-text">{meta.error}</div>}
		</div>
	);
};

export const Textarea = ({ input, meta, ...props }) => {
	const isError = meta.error && meta.touched;
	return (
		<div className={`form-control ${isError && 'error'}`}>
			<div>
				<textarea {...props} {...input}></textarea>
			</div>
			{isError && <div className="error-text">{meta.error}</div>}
		</div>
	);
};

export const createField = (validators, placeholder, name, component, props = {}) => {
	return <Field validate={validators} placeholder={placeholder} name={name} component={component} {...props} />;
};
