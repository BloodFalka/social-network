import React, { useEffect, useState, FC, useCallback, useRef } from 'react'
import './search-input.scss'
import { Redirect, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { GoSearch } from 'react-icons/go'
import debonce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPage } from '../../../../redux/selectors/users-selector'
import { getPhotos } from '../../../../redux/reducers/pexelPhotos-reducer'
import { getUsers } from '../../../../redux/reducers/users-reducer'
import { selectSearchTerm } from '../../../../redux/selectors/app-selector'
import { actions as appActions} from '../../../../redux/reducers/app-reducer'
import { actions as usersActions} from '../../../../redux/reducers/users-reducer'
import queryString from 'querystring'

const updateTerm = appActions.updateTerm,
		setCurrentPage = usersActions.setCurrentPage

type QueryType = {
	term: string
	usersPage: string
}

const SearchInput: FC = (props) => {
	const [redirect, setRedirect] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const searchTerm = useSelector(selectSearchTerm),
		currentUsersPage = useSelector(selectCurrentPage),
		currentPage = useSelector(selectCurrentPage)

	const dispatch = useDispatch()

	const history = useHistory()

	useEffect(() => {
		const actualQuery = queryString.parse(history.location.search.substr(1)) as QueryType
		if(actualQuery.term && actualQuery.term !== '')dispatch(updateTerm(actualQuery.term))
		if(actualQuery.usersPage && actualQuery.usersPage !== '1')dispatch(setCurrentPage(+actualQuery.usersPage))
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		const query = {} as QueryType

		if(!!searchTerm) query.term = searchTerm
		if(currentPage!==1) query.usersPage = `${currentPage}`

		if(history.location.pathname==='/search'){
			history.push({
				pathname: '/search',
				search: queryString.stringify(query)
			})
		}
		// eslint-disable-next-line
	}, [currentPage, searchTerm])



	useEffect(() => {
		if (redirect === true) setRedirect(false)
		if (inputRef.current) inputRef.current.focus()
	}, [redirect])

	const getSearchItems = useCallback(
		debonce(
			() => {
				if (history.location.pathname !== '/search') {
					setRedirect(true)
				}

				dispatch(getPhotos(30))
				dispatch(getUsers(6, currentUsersPage))
			},
			1000,
			{ leading: false, trailing: true }
		),
		[]
	)

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateTerm(e.currentTarget.value))
		getSearchItems()
	}


	return redirect ? (
		<Redirect to="/search" />
	) : (
		<div className="search-input">
			<GoSearch onClick={() => setRedirect(true)} className="search-image" />

			<Formik initialValues={{ searchTerm: '' }} onSubmit={(values, { setSubmitting }) => {}}>
				<Form>
					<Field
						type="text"
						name="searchTerm"
						innerRef={inputRef}
						onChange={onChangeSearch}
						className="input"
						autoComplete="off"
						placeholder="Search anything"
						value={searchTerm}
					/>
				</Form>
			</Formik>
		</div>
	)
}

export default SearchInput
