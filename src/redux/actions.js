const addPostActionCreator = () => ({ type: 'ADD_POST' });

const updateNewPostActionCreator = (text) => ({
	type: 'UPDATE_ADD_POST_TEXT',
	newText: text,
});

const addMessageActionCreator = () => ({ type: 'ADD_MESSAGE' });
const updateNewMessageActionCreator = (text) => ({
	type: 'UPDATE_ADD_MESSAGE_TEXT',
	newMessage: text,
});

export {
	addPostActionCreator,
	updateNewPostActionCreator,
	addMessageActionCreator,
	updateNewMessageActionCreator,
};
