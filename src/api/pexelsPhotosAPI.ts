import axios from 'axios'

//AXIOS INSTANCE//
const axiosInstance = axios.create({
    baseURL: 'https://api.pexels.com/v1/',
	headers: {
        Authorization: '563492ad6f917000010000019bc651c33b8d47a483d905abb66d2f43'
        // '563492ad6f9170000100000196deef0c580e48f9bd5c0b0241af8a5c'
	},
})

type srcType = {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
}

export type pexelsPhotosType = {
    id: number,
    width: number,
    height: number,
    url: string,
    photographer: string,
    photographer_url: string,
    photographer_id: number,
    src: srcType,
    liked: boolean
}

type getModeratedPhotosResponseType = {
    total_results: number,
	page: number,
	per_page: number,
	photos: Array<pexelsPhotosType>,
	next_page: string,
}

type getSearchedPhotosResponseType = {
    total_results: number,
	page: number,
	per_page: number,
	photos: Array<pexelsPhotosType>,
	next_page: string,
}

export const pexelsPhotosAPI = {
	getModeratedPhotos(photosPerPage: number = 30) {
		return axiosInstance
			.get<getModeratedPhotosResponseType>(`curated?per_page=${photosPerPage}`)
			.then((response) => response.data)
    },
    getSearchedPhotos(photosPerPage: number = 30, searchQuery: string){
        return axiosInstance
        .get<getSearchedPhotosResponseType>(`search?query=${searchQuery}&per_page=${photosPerPage}`)
        .then((response) => response.data)
    },
    getNextPage(url: string){
        return axiosInstance
        .get<getSearchedPhotosResponseType>(url)
        .then((response) => response.data)
    }
}
