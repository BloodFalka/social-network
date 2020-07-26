import React from 'react';
import {SocialMediaIconsReact as SocialIcons} from 'social-media-icons-react';
import './profile.scss';

const Profile = () => {
    return(
        <div className='profile'>
            <div className='profile__header'>
                <img className='profile__avatar' src="https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png" alt="avatar"/>
                <div className="profile__description">
                    <div className='profile__name'>Ivan Ivanov</div>
                    <div className="profile__birth-date">Date of Birth: 12.28.1999</div>
                    <div className="profile__city">City: Bila Tserkva</div>
                    <div className="profile__socials">
                        <div className="profile__socials-title">Other socials:</div>
                        <div className="profile__socials-link">
                            <SocialIcons className='profile__socials-logo' backgroundColor='black' iconSize="4" roundness="20%" icon="instagram" url=""/> 
                            <a href="https://www.instagram.com">instagram.com</a>
                        </div>
                        <div className="profile__socials-link">
                            <SocialIcons className='profile__socials-logo' backgroundColor='black' iconSize="4" roundness="20%" icon="facebook" url=""/>
                            <a href="https://www.facebook.com/">facebook.com</a>
                        </div>
                        <div className="profile__socials-link">
                            <SocialIcons className='profile__socials-logo' backgroundColor='black' iconSize="4" roundness="20%" icon="web" url=""/>
                            <a href="https://bloodfalka.ru/">bloodfalka.ru</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts">
                My posts
                <form action="" className="posts__post-form">New post</form>
                <div className="posts__post">Post 1</div>
                <div className="posts__post">Post 2</div>
            </div>
        </div>
    )
}

export default Profile;