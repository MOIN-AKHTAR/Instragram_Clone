import React from 'react';
import Avatar from '@material-ui/core/Avatar'

export default function Post({userName,imgUrl,caption}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar alt="User" src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg" 
            aria-hidden
            className="post__avatar"
            />
            <h4>Moin Akhter</h4>
            </div>
            <img src={imgUrl} alt="Image" 
            aria-hidden
            className="post__image"
            />
            <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
        </div>
    )
}
