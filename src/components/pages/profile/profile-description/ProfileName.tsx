import React, { FC } from 'react'

type ProfileNamePropsType = {
	name: string,
}
export const ProfileName: FC<ProfileNamePropsType> = ({ name }) => {
	return <div className="name">{name}</div>
}
