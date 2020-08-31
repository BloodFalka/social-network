import React, { FC } from 'react';
import {NavLink} from 'react-router-dom';
import './dialog.scss';

type PropsType = {
    id: number
    name: string
    avatar?: string|null
}

const Dialog: FC<PropsType> = ({id, name, avatar}) => {
    const noAvatar = 'https://image.flaticon.com/icons/png/512/206/206858.png';
    return(
        <div className="dialog">
            <NavLink to={`/dialogs/${id}`}>
                <img src={avatar? avatar: noAvatar} alt="avatar"/>
                {name}
            </NavLink>
        </div>
    );
};

export default Dialog;