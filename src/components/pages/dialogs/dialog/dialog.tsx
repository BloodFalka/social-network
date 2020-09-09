import React, { FC, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import './dialog.scss';

type PropsType = {
    id: number
    name: string
    avatar?: string|null
    newMessagesCount: number
    currentDialogId: number
    setMessageFriendAvatar: (avatar: string) => void
}

const Dialog: FC<PropsType> = ({id, currentDialogId, name, avatar, newMessagesCount, setMessageFriendAvatar}) => {
    const noAvatar = 'https://image.flaticon.com/icons/png/512/206/206858.png';

    useEffect(() => {
        if (id===currentDialogId) setMessageFriendAvatar(avatar||noAvatar)
        // eslint-disable-next-line
    }, [currentDialogId])

    return(
        <div className="dialog">
            <NavLink to={`/dialogs/${id}`}>
                {newMessagesCount>0&&<div className="new-message-count">{newMessagesCount}</div>}
                <img src={avatar? avatar: noAvatar} alt="avatar"/>
                <div className="name">{name}</div>
            </NavLink>
        </div>
    );
};

export default Dialog;