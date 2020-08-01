import friendsReducer from './reducers/friends-reducer';
import messageReducer from './reducers/message-reducer';
import newPostReducer from './reducers/new-post-reducer';
import profileReducer from './reducers/profile-reducer';

let store = {
	_state: {
		profilePage: {
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
			data: {
				name: 'MC Antoha',
				avatar:
					'https://i.pinimg.com/564x/06/c7/df/06c7df7ec5a9295a21f6c2040992376e.jpg',
				dateOfBirth: '12.28.1999',
				city: 'Bila Tserkva',
			},
		},
		newPostPage: {
			newPostText: '',
		},
		messagePage: {
			dialogs: [
				{
					id: 1,
					name: 'Anton Ivanchuk Volodymirovich',
					avatar:
						'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
				},
				{
					id: 2,
					name: 'Luda',
				},
				{
					id: 3,
					name: 'Nazar',
					avatar:
						'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
				},
				{
					id: 4,
					name: 'Evans',
				},
				{
					id: 5,
					name: 'Vitalii Kovalev',
				},
				{
					id: 6,
					name: 'Telepen',
				},
				{
					id: 7,
					name: 'Typii',
				},
				{
					id: 8,
					name: 'Tygiy',
				},
			],
			messages: [
				{
					id: 1,
					message: '25 grn plz beatch',
					avatar:
						'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
					likesCount: 0,
				},
				{
					id: 2,
					message: 'No, you are Batman, beatch',
					avatar:
						'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
					likesCount: 0,
					myMessage: true,
				},
			],
			newMessageText: '',
		},
		friendsPage: [
			{
				id: 1,
				name: 'Nazar',
				status: 'Сижу, дрочу',
				avatar:
					'https://64.media.tumblr.com/1c514ce43579700281ab8a0865b368f2/22afc2ab60dda296-7f/s64x64u_c1/365ec021fdb4c9dbdb0d547d4afef07ea6af2114.jpg',
			},
			{
				id: 2,
				name: 'Luda',
				status: 'Люблю, малюю',
				avatar: 'https://64.media.tumblr.com/avatar_eb8de738b49f_64.pnj',
			},
			{
				id: 3,
				name: 'Yarik',
				status: 'Сижу в парехмахерській',
				avatar: 'https://64.media.tumblr.com/avatar_3586510f8174_64.pnj',
			},
			{
				id: 4,
				name: 'Olga Ivanchuk',
				status: 'Люблю діточок',
				avatar:
					'https://64.media.tumblr.com/d34cfd1b94ba2faa7b1ebf532d8873f1/f116ea7a5e039163-7d/s64x64u_c1/f49235917fa92aed8e0a114812da3c25596af769.jpg',
			},
			{
				id: 5,
				name: 'Vlad Ivanchuk',
				status: '5G убило дітей',
				avatar: 'https://64.media.tumblr.com/avatar_93e7f1552c09_64.pnj',
			},
			{
				id: 6,
				name: 'Marina Konenko',
				status: 'Сижу, учу',
				avatar:
					'https://64.media.tumblr.com/c93abdd7cc5c1a006df47d92b9b8a459/cccb61c42ec37242-40/s64x64u_c1/e626f27878521d67d180d1c060ad33293d7c7cd5.jpg',
			},
			{
				id: 7,
				name: 'Mayka',
				status: 'Meaw-Meaw',
				avatar: 'https://64.media.tumblr.com/avatar_11e065c2fc77_64.pnj',
			},
			{
				id: 8,
				name: 'Yulka',
				status: 'Сижу, tulpy',
				avatar: '',
			},
			{
				id: 9,
				name: 'Lupin',
				status: 'OBOROTEN',
				avatar: 'https://64.media.tumblr.com/avatar_3645b7285976_64.pnj',
			},
			{
				id: 10,
				name: 'Harry Potter',
				status: 'Coldun',
				avatar:
					'https://64.media.tumblr.com/6e007046ef55d71316b78680302558f7/bab1c6b251040fe6-91/s400x600/7c9eea32860217f3922a80aee1d25d38b56526d0.jpg',
			},
		],
	},
	_callSubscriber(state) {},

	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		this._state.friendsPage = friendsReducer(this._state.friendsPage, action);
		this._state = messageReducer(this._state, action);
		this._state = newPostReducer(this._state, action);
		this._state.profilePage = profileReducer(this._state.profilePage, action);

		this._callSubscriber(this._state);
	},
};

window.store = store;

export default store;
