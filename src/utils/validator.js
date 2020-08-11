export const required = (value) => (value ? undefined : 'Field is required');

export const maxLengthCreator = (maxLength) => (value) => {
	return value && value.length < maxLength ? undefined : `Max length is ${maxLength} symbols`;
};

export const minLengthCreator = (minLength) => (value) => {
	return value && value.length > minLength ? undefined : `Min length is ${minLength} symbols`;
};
