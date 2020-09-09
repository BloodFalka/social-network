import React, { useEffect, FC, useState } from 'react'
import PixelPhotos from './pexelPhotos'
import {
	getPhotos,
	getPhotosFromNextPage,
	updateUserPhotoFromPexel,
} from '../../../../redux/reducers/pexelPhotos-reducer'
import { connect } from 'react-redux'
import Spinner from '../../../common/spinner/spinner'
import { compose } from 'redux'
import { AppStateType } from '../../../../redux/store'
import { PexelsPhotosType } from '../../../../api/pexelsPhotosAPI'
import { useInView } from 'react-intersection-observer'
import {
	selectPhotos,
	selectIsLoading,
	selectIsError,
	selectFindedPhotosCount,
	selectNextPhotosPageUrl,
	selectIsLoadingNextPage,
} from '../../../../redux/selectors/pexelPhotos-selector'
import Wrapper from './wrapper'
import { Redirect } from 'react-router-dom'

type MapStatePropsType = {
	photos: Array<PexelsPhotosType>,
	findedPhotosCount: number | null,
	nextPhotosPageUrl: string,
	isLoading: boolean,
	isLoadingNextPage: boolean,
	isError: boolean,
}

type MapDispatchPropsType = {
	getPhotos: (photosPerPage?: number) => void,
	getPhotosFromNextPage: () => void,
	updateUserPhotoFromPexel: (url: string) => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const PixelPhotosContainer: FC<PropsType> = ({
	isLoading,
	isLoadingNextPage,
	isError,
	photos,
	findedPhotosCount,
	nextPhotosPageUrl,
	getPhotos,
	getPhotosFromNextPage,
	updateUserPhotoFromPexel,
}) => {
	const [ref, inView] = useInView({
		threshold: 0,
	})
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		getPhotos(30)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (inView === true) getPhotosFromNextPage()
		// eslint-disable-next-line
	}, [inView])

	const onSetAsAvatarClick = (url: string) => {
		updateUserPhotoFromPexel(url)
		setRedirect(true)
	}

	return redirect ? (
		<Redirect to="profile" />
	) : isError ? (
		<img src="https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png" alt="Error" />
	) : isLoading ? (
		<Spinner />
	) : (
		<PixelPhotos
			photos={photos}
			findedPhotosCount={findedPhotosCount}
			nextPhotosPageUrl={nextPhotosPageUrl}
			onSetAsAvatarClick={onSetAsAvatarClick}
		>
			{isLoadingNextPage ? (
				<Spinner />
			) : (
				<Wrapper ref={ref}>
					<div className="nextPortionObserver" ref={ref}>
						{inView.toString()}
					</div>
				</Wrapper>
			)}
		</PixelPhotos>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	photos: selectPhotos(state),
	findedPhotosCount: selectFindedPhotosCount(state),
	nextPhotosPageUrl: selectNextPhotosPageUrl(state),
	isLoading: selectIsLoading(state),
	isLoadingNextPage: selectIsLoadingNextPage(state),
	isError: selectIsError(state),
})

const mapDispatchToProps = {
	getPhotos,
	getPhotosFromNextPage,
	updateUserPhotoFromPexel,
}

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(PixelPhotosContainer)
