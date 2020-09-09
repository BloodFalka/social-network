import React, { FC } from 'react'
import { ContactsType } from '../../../../../types/types'
import {
	FaGithub,
	FaVk,
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaChrome,
	FaYoutube,
	FaStar,
} from 'react-icons/fa'

type SocialLinkPropsType = {
	name:  keyof ContactsType,
	url: string,
}
export const SocialsLink: FC<SocialLinkPropsType> = ({ name, url }) => {
	let socialImage

	switch (name) {
		case 'github':
			socialImage = <FaGithub />
			break
		case 'vk':
			socialImage = <FaVk />
			break
		case 'facebook':
			socialImage = <FaFacebookF />
			break
		case 'instagram':
			socialImage = <FaInstagram />
			break
		case 'twitter':
			socialImage = <FaTwitter />
			break
		case 'website':
			socialImage = <FaChrome />
			break
		case 'youtube':
			socialImage = <FaYoutube />
			break
		case 'mainLink':
			socialImage = <FaStar />
			break
	}

	return (
		<div>
			<a href={url}>{socialImage}</a>
		</div>
	)
}