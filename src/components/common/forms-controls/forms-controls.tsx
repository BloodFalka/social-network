import React, { FC } from 'react'
import './form-control.scss'
import { Field, WrappedFieldProps } from 'redux-form'
import { FieldValidatorsType } from '../../../utils/validator'

export const Input: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
	const isError = meta.error && meta.touched
	return (
		<div className={`form-control ${isError && 'error'}`}>
				<input {...props} {...input}></input>
			{isError && <div className="error-text">{meta.error}</div>}
		</div>
	)
}

export const Textarea: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
	const isError = meta.error && meta.touched
	return (
		<div className={`form-control ${isError && 'error'}`}>
				<textarea {...props} {...input}></textarea>
			{isError && <div className="error-text">{meta.error}</div>}
		</div>
	)
}

export type ExtractStringKeys<T> =  Extract<keyof T, string>

export function createField<FormKeysType extends string>(
	validators: Array<FieldValidatorsType>,
	placeholder: string | undefined,
	name: FormKeysType,
	component: FC<WrappedFieldProps>,
	props?: { className?: string, type?: string }
) {
	return (
		<Field validate={validators} placeholder={placeholder} name={name} component={component} {...props} />
	)
}
