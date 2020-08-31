import React, { FC } from 'react'
import './message.scss'
import Like from '../../../../common/like/like'

type PropsType = {
	avatar?: string
	message: string
	likesCount: number
	liked: boolean
	id: number|string
}

const Message: FC<PropsType> = (props) => {
	const { avatar, message, likesCount, liked, id } = props
	return (
		<div className="message">
			<img src={avatar} alt="sendler-avatar" className="avatar" />
			<div className="message-text">
				{message}
				<Like
					liked={liked}
					likesCount={likesCount}
					itemId = {id}
					addLike={()=>console.log('liked')}
					removeLike={()=>console.log('unliked')}/>
			</div>
		</div>
	)
}

export default Message
