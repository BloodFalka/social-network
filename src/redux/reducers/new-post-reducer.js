const ADD_POST = 'newPost/ADD_POST';

let initialState = {
	posts: [
		{
			id: 3,
			images: [
				'https://64.media.tumblr.com/9320cd074f45f7ec3533b77f049120c5/809decabfbfd5c24-73/s540x810/6957891bd178ea1670a0e12b6e84f7b172acbc44.jpg',
				'https://64.media.tumblr.com/dcc66cb69e9870f131fdc5713e07d3db/809decabfbfd5c24-a7/s540x810/ee3e58981b46c58add031bf3a2e68c12a59fd011.jpg',
				'https://64.media.tumblr.com/e9c2ece35def202a8ba632ddc8884e7b/809decabfbfd5c24-3b/s540x810/2819d04d56683155ddab5852ba9443e3104d3948.jpg',
				'https://64.media.tumblr.com/7bdcd6b1b6f4ae9f82962e9e87c78329/809decabfbfd5c24-2b/s540x810/a436cfafc983b689fcf5c1027b4f43579141f2f5.jpg',
			],
			message:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsa sit repellat dolorum hic commodi perspiciatis. Quidem odio hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni?',
			likesCount: 0,
		},
		{
			id: 1,
			images: [
				'https://64.media.tumblr.com/cfe055382935c3451dac39ddf3f3c258/888034e70d049f51-bf/s400x600/5fe5a1c0e6fa439f5bf92a5bb3e26488bf4e3463.png',
			],
			message:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsa sit repellat dolorum hic commodi perspiciatis. Quidem odio hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsa sit repellat dolorum hic commodi perspiciatis. Quidem odio hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni?',
			likesCount: 0,
		},
		{
			id: 2,
			images: [
				'https://64.media.tumblr.com/0a7466398d0a1532533b02a066cff280/7b7082e8fc505b6f-88/s1280x1920/0e363671ade8535fe8e7af6e71e63575fdb834ea.jpg',
			],
			message:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsa sit repellat dolorum hic commodi perspiciatis. Quidem odio hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni?',
			likesCount: 0,
		},
		{
			id: 4,
			images: [
				'https://64.media.tumblr.com/6a63d0e70371f43ce6e3e5e87c2c7bb8/d6088d376d7a0b4a-bd/s2048x3072/fb2d3e9b99e41d1bc11abf69e2a16cd11ebb3b7e.jpg',
			],
			message: 'I lorem ipsup dolores',
			likesCount: 0,
		},
		{
			id: 5,
			images: [
				'https://64.media.tumblr.com/f69fa9f4581de3bf1d5baabae89183cc/4bf71134bcbb3d83-d1/s400x600/d6ad371fa18264ac4122f063f06312557a522df8.png',
			],
			message:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsa sit repellat dolorum hic commodi perspiciatis. Quidem odio hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni? hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni hic omnis dicta adipisci doloribus, quae libero, error molestias nesciunt, ad magni',
			likesCount: 0,
		},
	],
};

const newPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				images: [],
				message: action.text,
				likesCount: 0,
			};
			return { ...state, posts: [newPost, ...state.posts] };

		default:
			return state;
	}
};

export const addPost = (text) => ({ type: ADD_POST, text });

export default newPostReducer;
