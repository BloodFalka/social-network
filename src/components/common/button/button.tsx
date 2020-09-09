import React, {FC} from 'react'
import './button.scss'

type PropsType = {
	onClick?:()=>void
	text?: string|null
	color?: string|null
	disabled?: boolean
}

const Button: FC<PropsType> = ({onClick, text, disabled,color,children}) => {
	const buttonColor = { backgroundColor: `${color}` }
	return (
			<div>
				<button
					onClick={onClick}
					className="button"
					style={buttonColor}
					disabled={disabled}>
					{text} {children}
				</button>
			</div>
	)
}

export default Button