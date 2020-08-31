export type FieldValidatorsType = (value: string) => string | undefined

export const required: FieldValidatorsType = (value) => (value ? undefined : 'Field is required')

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {
	return value && value.length <= maxLength ? undefined : `Max length is ${maxLength} symbols`
}

export const minLengthCreator = (minLength: number): FieldValidatorsType => (value) => {
	return value && value.length >= minLength ? undefined : `Min length is ${minLength} symbols`
}
