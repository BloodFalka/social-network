const ADD_POST = 'ADD_POST',
	UPDATE_ADD_POST_TEXT = 'UPDATE_ADD_POST_TEXT';

let initialState = {
	newPostText: '',
};

const ggg = (state = initialState, { type, payload }) => {
	switch (type) {
		case typeName:
			return { ...state, ...payload };

		default:
			return state;
	}
};

const newPostReducer = (state = initialState, action) => {
	let b = { ...state };
	switch (action.type) {
		case ADD_POST:
			const posts = b.profilePage.posts;
			let newPost = {
				id: posts.length + 1,
				images: [],
				message: b.newPostPage.newPostText,
				likesCount: 0,
			};
			posts.unshift(newPost);
			b.newPostPage.newPostText = '';

			return b;
		case UPDATE_ADD_POST_TEXT:
			b.newPostPage.newPostText = action.newText;
			return { ...state, ...b };

		default:
			return state;
	}
};

export default newPostReducer;
