//Profile
export type contactsType = {
	github: string|null
	vk: string|null
	facebook: string|null
	instagram: string|null
	twitter: string|null
	website: string|null
	youtube: string|null
	mainLink: string|null
}
export type photosType = {
	large: string|null
	small: string|null
}
export type userDataType = {
	aboutMe: string
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string|null
	fullName:string
	contacts:contactsType
	photos:photosType
}

export type userType = {
	id: number
	name: string
	status: string
	photos: photosType
	followed: boolean
}

export type userPhotoFileType = {
	lastModified: number
	lastModifiedDate: any
	name: string
	size: number
	type: string
	webkitRelativePath: string
}

//Posts
export type postsType = {
	id:number
	images: Array<string>
	message: string
	likesCount: number
	liked: boolean
}