import React, {FC} from 'react'
import './button.scss'

type PropsType = {
	onClick:()=>void
	text: null|string
	color: null|string
	disabled: boolean
}

const Button: FC<PropsType> = ({onClick, text, disabled=true,color}) => {
	const buttonColor = { backgroundColor: `${color}` }
	return (
		<div>
			<button
				onClick={onClick}
				className="button"
				style={buttonColor}
				disabled={disabled}
			>
				{text}
			</button>
		</div>
	)
}

export default Button
