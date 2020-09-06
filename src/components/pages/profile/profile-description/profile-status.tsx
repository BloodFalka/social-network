import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import Button from '../../../common/button/button'
import './profile-description.scss'

type PropsType = {
	status: string,
	isMyPage: boolean
	updateUserStatus: (newStatus: string) => void,
}

const ProfileStatus: FC<PropsType> = (props: PropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const onStatusDoubleClick = () => {
		props.isMyPage && setEditMode(true)
	}

	const onEditClick = () => {
		setEditMode(false)
		props.updateUserStatus(status)
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className="status">
			{!editMode ? (
				<div className="status-text" onDoubleClick={onStatusDoubleClick}>
					{status || 'No Status'}
				</div>
			) : (
				<div className="status-edit">
					<input onChange={onStatusChange} className="input" value={status} />
					<Button onClick={onEditClick} text="Edit" color="" disabled={false} />
				</div>
			)}
		</div>
	)
}

export default ProfileStatus
