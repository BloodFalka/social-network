import React from 'react';
import {NavLink} from 'react-router-dom';
import './dialog.scss';

const Dialog = (props) => {
    const {id, name, avatar} = props;
    const noAvatar = 'https://image.flaticon.com/icons/png/512/206/206858.png'
    return(
        <div className="dialog">
            <NavLink to={`/dialogs/${id}`}>
                <img src={avatar? avatar: noAvatar} alt="avatar"/>
                {name}
            </NavLink>
        </div>
    )
};

export default Dialog;