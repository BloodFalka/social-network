import React from 'react'
import './search.scss'
import { Users } from './users/users'
import PixelPhotos from './pixelPhotos/pexelPhotos-container'

const Search = () => {
	return (
		<div className="search">
			<Users />
			<PixelPhotos />
		</div>
	)
}

export default Search
