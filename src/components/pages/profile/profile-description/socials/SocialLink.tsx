import React, { FC } from 'react'
// @ts-ignore
import { SocialMediaIconsReact as SocialIcons } from 'social-media-icons-react'
type SocialLinkPropsType = {
	name: string,
	url: string,
}

export const SocialsLink: FC<SocialLinkPropsType> = ({ name, url }) => {
	return (
		<div>
			<SocialIcons
				className="socials-link"
				borderColor="rgba(255,255,255,0.25)"
				borderWidth="2"
				borderStyle="solid"
				iconColor="rgba(255,255,255,1)"
				backgroundColor="rgba(0,0,0,0)"
				iconSize="5"
				roundness="20%"
				size="45"
				icon={name === 'website' ? 'web' : name === 'mainLink' ? 'favorite' : name}
				url={url}
			/>
		</div>
	)
}
