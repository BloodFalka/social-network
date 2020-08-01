let initialState = {
	friends: [
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
};

const friendsReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default friendsReducer;
