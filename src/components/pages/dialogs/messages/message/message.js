import React from 'react';
import './message.scss';
import Like from '../../../../common/like';

const Message = (props) => {
	const { avatar, message } = props;
	return (
		<div className="message">
			<img src={avatar} alt="sendler-avatar" className="avatar" />
			<div className="message-text">
				{message}
				<Like />
			</div>
		</div>
	);
};

export default Message;
