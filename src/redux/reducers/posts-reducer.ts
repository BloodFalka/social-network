import { postsType } from "../../types/types"

const ADD_POST = 'posts/ADD_POST',
	ADD_LIKE = 'posts/ADD_LIKE',
	REMOVE_LIKE = 'posts/REMOVE_LIKE',
	REMOVE_POST = 'posts/REMOVE_POST',
	EDIT_POST = 'posts/EDIT_POST'



type initialStateType = {
	posts: Array<postsType>
}

let initialState:initialStateType = {
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
				'З самого початку React був спроектований так, щоб його можна було впроваджувати поступово. Тобто ви можете додавати так мало або так багато React-у, як вам потрібно. Скористайтеся інформацією та посиланнями цього розділу, якщо просто бажаєте відчути React на смак або додаєте трохи “інтерактивності” до простої HTML-сторінки, чи, навіть, якщо стартуєте складний React-проект.',
			likesCount: 50,
			liked: false,
		},
		{
			id: 1,
			images: [
				'https://64.media.tumblr.com/cfe055382935c3451dac39ddf3f3c258/888034e70d049f51-bf/s400x600/5fe5a1c0e6fa439f5bf92a5bb3e26488bf4e3463.png',
			],
			message:
				'Коли стартуєте React-проект, проста HTML-сторінка з script-тегами , можливо, є найкращим варіантом. Її створення займе лише одну хвилину! Однак для розробки більш складного додатку, можливо, доцільніше розглянути більш інтегрований варіант установки. Ось декілька наборів JavaScript-інструментів, які ми рекомендуємо для розробки більш серйозних React-додатків. Кожен із них є готовим до використання з мінімальними змінами, і дозволяє скористатися всіма перевагами багатої React-екосистеми. Дізнайтесь як.',
			likesCount: 8,
			liked: false,
		},
		{
			id: 2,
			images: [
				'https://64.media.tumblr.com/0a7466398d0a1532533b02a066cff280/7b7082e8fc505b6f-88/s1280x1920/0e363671ade8535fe8e7af6e71e63575fdb834ea.jpg',
			],
			message:
				'Домашня сторінка містить декілька невеликих прикладів React, які можна редагувати “наживо”. Навіть якщо ви не знаєте нічого про React, пограйтеся з кодом, аби побачити, як це вплине на результат.',
			likesCount: 0,
			liked: false,
		},
		{
			id: 4,
			images: [
				'https://64.media.tumblr.com/6a63d0e70371f43ce6e3e5e87c2c7bb8/d6088d376d7a0b4a-bd/s2048x3072/fb2d3e9b99e41d1bc11abf69e2a16cd11ebb3b7e.jpg',
			],
			message:
				'У цьому посібнику ми розглянемо створення інтерактивної гри в хрестики-нулики за допомогою React. Кінцевий результат ви можете розглянути за наступним посиланням: Завершена гра . Не хвилюйтесь, якщо код здається вам незрозумілим, або ви не знайомі з синтаксисом! Мета даного посібника — допомогти вам зрозуміти React і його синтаксис.Ми радимо уважно роздивитися гру перед тим як продовжувати працювати над посібником. Одна з її помітних властивостей — пронумеровани список з правої сторони ігрового поля. Цей список відображає історію всіх ходів і оновлюється по ходу гри.Ви можете закрити гру, коли закінчите ознайомлюватись. Ми почнемо з простішого зразка. Наш наступний крок — підготуватись до створення гри.',
			likesCount: 3,
			liked: false,
		},
		{
			id: 5,
			images: [
				'https://64.media.tumblr.com/f69fa9f4581de3bf1d5baabae89183cc/4bf71134bcbb3d83-d1/s400x600/d6ad371fa18264ac4122f063f06312557a522df8.png',
			],
			message:
				'Існує два способи проходження цього посібника: ви можете писати код у браузері, або налаштувати локальне середовище розробки на своєму комп’ютері.',
			likesCount: 6,
			liked: false,
		},
	],
}

type postActionTypes = addPostActionTypes|removePostActionTypes|addLikeActionTypes|removeLikeActionTypes|editPostActionTypes

const newPostReducer = (state = initialState, action: postActionTypes):initialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				images: [],
				message: action.text,
				likesCount: 0,
				liked: false,
			}
			return { ...state, posts: [newPost, ...state.posts] }
		case ADD_LIKE:
			const likedPost = state.posts.filter((post) => post.id === action.postId)[0]
			const likedPostIndex = state.posts.findIndex((likedPost) => likedPost.id === action.postId)
			debugger
			return {
				...state,
				posts: [
					...state.posts.slice(0, likedPostIndex),
					{ ...likedPost, liked: true, likesCount: likedPost.likesCount + 1 },
					...state.posts.slice(likedPostIndex + 1),
				],
			}
		case REMOVE_LIKE:
			const unLikedPost = state.posts.filter((post) => post.id === action.postId)[0]
			const unLikedPostIndex = state.posts.findIndex((unLikedPost) => unLikedPost.id === action.postId)
			return {
				...state,
				posts: [
					...state.posts.slice(0, unLikedPostIndex),
					{ ...unLikedPost, liked: false, likesCount: unLikedPost.likesCount - 1 },
					...state.posts.slice(unLikedPostIndex + 1),
				],
			}
		case REMOVE_POST:
			const removingPostIndex = state.posts.findIndex((removingPost) => removingPost.id === action.postId)
			return {
				...state,
				posts: [...state.posts.slice(0, removingPostIndex), ...state.posts.slice(removingPostIndex + 1)],
			}
		case EDIT_POST:
			const editingPost = state.posts.filter((post) => post.id === action.postId)[0]
			const editingPostIndex = state.posts.findIndex((editingPost) => editingPost.id === action.postId)
			return {
				...state,
				posts: [
					...state.posts.slice(0, editingPostIndex),
					{ ...editingPost, message: action.text },
					...state.posts.slice(editingPostIndex + 1),
				],
			}
		default:
			return state
	}
}

type addPostActionTypes = {
	type: typeof ADD_POST,
	text: string
}

type removePostActionTypes = {
	type: typeof REMOVE_POST,
	postId: number
}

type addLikeActionTypes = {
	type: typeof ADD_LIKE,
	postId: number
}

type removeLikeActionTypes = {
	type: typeof REMOVE_LIKE,
	postId: number
}

type editPostActionTypes = {
	type: typeof EDIT_POST,
	postId: number
	text: string
}



export const addPost = (text: string):addPostActionTypes => ({ type: ADD_POST, text })
export const removePost = (postId: number):removePostActionTypes => ({ type: REMOVE_POST, postId })
export const addLike = (postId: number):addLikeActionTypes => ({ type: ADD_LIKE, postId })
export const removeLike = (postId: number):removeLikeActionTypes => ({ type: REMOVE_LIKE, postId })
export const editPost = (postId: number, text: string):editPostActionTypes => ({ type: EDIT_POST, postId, text })

export default newPostReducer
