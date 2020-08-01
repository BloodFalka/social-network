import React from 'react';
import './friend.scss';

const Friend = (props) => {
    const {name, status} = props;
    const avatar = props.avatar? props.avatar: 'https://64.media.tumblr.com/1361956a513a5635fbed50721a32d489/2a7fec2e0bcb2fd3-f6/s64x64u_c1/922d813795c6a5a81e6bb7d627621694eb442e07.pnj';
    return(
        <div className='friend'>
            <img className='avatar' src={avatar} alt={`${name}-avatar`}/>
            <div className='text'>
                <div className='name'>{name}</div>
                <div className='status'>{status}</div>
            </div>
        </div>
    )
}

export default Friend;