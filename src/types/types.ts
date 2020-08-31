//Profile
export type ContactsType = {
	github: string|null
	vk: string|null
	facebook: string|null
	instagram: string|null
	twitter: string|null
	website: string|null
	youtube: string|null
	mainLink: string|null
}
export type PhotosType = {
	large: string|null
	small: string|null
}
export type UserDataType = {
	aboutMe: string
	userId: number|null
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName:string
	contacts:ContactsType
	photos:PhotosType
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}

// export type userPhotoFileType = {
// 	lastModified: number
// 	lastModifiedDate: number
// 	name: string
// 	size: number
// 	type: string
// 	webkitRelativePath: string
// }

//Posts
export type PostsType = {
	id:number|string
	images: Array<string>|null
	message: string
	likesCount: number
	liked: boolean
}

export type MessagesType = {
	id: number|string
	message: string
	avatar: string|null
	likesCount: number
	liked: boolean
}

export type DialogsType = {
	id: number
	name: string
	avatar?: string
}

export type FriendType ={
	id: number
	name: string
	status: string
	avatar: string|null
}

export type LoginDataFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string|null
}