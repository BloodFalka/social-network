import React, { FC } from 'react'
import Photo from './photo/photo'
import './pexelPhotos.scss'
import { PexelsPhotosType } from '../../../../api/pexelsPhotosAPI'
import Masonry from 'react-masonry-css'
import nextId from 'react-id-generator'

type PropsType = {
	photos: Array<PexelsPhotosType>,
	findedPhotosCount: number | null,
	nextPhotosPageUrl: string,
	children: React.ReactNode,
	onSetAsAvatarClick: (url: string) => void,
}

const PixelPhotos: FC<PropsType> = ({
	photos,
	findedPhotosCount,
	children,
	nextPhotosPageUrl,
	onSetAsAvatarClick,
}) => {
	const photosTemplate = photos.map((item) => {
		return (
			<Photo
				id={item.id}
				key={`${nextId()}${item.id}`}
				photographer={item.photographer}
				photographer_url={item.photographer_url}
				src={item.src.large}
				onSetAsAvatarClick={onSetAsAvatarClick}
			/>
		)
	})
	return (
		<div className="photos-page">
			{photosTemplate.length ? (
				<>
					<div className="title">Photos</div>
					{findedPhotosCount && (
						<div className="information">
							<div>Results Count: {findedPhotosCount}</div>
						</div>
					)}
					<Masonry
						breakpointCols={{
							default: 3,
							1100: 3,
							700: 2,
							500: 1,
						}}
						className="photos"
						columnClassName="my-masonry-grid_column"
					>
						{photosTemplate}
					</Masonry>
					{nextPhotosPageUrl !== '' && children}
				</>
			) : (
				<div className="no-photos">Photos not found</div>
			)}
		</div>
	)
}

export default PixelPhotos
