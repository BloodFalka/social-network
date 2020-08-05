const addMessageActionCreator = () => ({ type: 'ADD_MESSAGE' });
const updateNewMessageActionCreator = (text) => ({
	type: 'UPDATE_ADD_MESSAGE_TEXT',
	newMessage: text,
});

export { addMessageActionCreator, updateNewMessageActionCreator };
