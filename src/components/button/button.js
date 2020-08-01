import React from 'react';
import './button.scss';

const Button = (props) => {
    const {onClick, text} = props
    return(
        <div>
           <button onClick={onClick} className='button'>{text}</button>
        </div>
    )
}

export default Button;