import React, { FC } from 'react'
import './error-popup.scss'

type PropsType = {
	errorText: string,
}

const ErrorPopup: FC<PropsType> = ({ errorText }) => {
	return <div className="error-popup">{errorText}</div>
}

export default ErrorPopup
