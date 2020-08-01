import React from 'react';
import './my-post.scss';
import Like from '../../../../like/like';

const MyPost = (props) => {
    const {message, images} = props;
    const img = images? images.map((item, i) =>{
        return(
            <img key={i} className='post-img' src={item} alt="post-foto"/>
        );
    }): null;
    return(
        <div className='my-post'>
            <div className='post-text'>{message}</div>
            {images? img : null}
            <Like/>
        </div>
    )
}

export default MyPost;