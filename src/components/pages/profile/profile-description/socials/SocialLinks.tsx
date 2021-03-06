import React, { FC } from 'react';
import { ContactsType } from '../../../../../types/types';
import { SocialsLink } from "./SocialLink";

export type SocialLinksPropsType = {
	contacts: ContactsType;
};
export const SocialsLinks: FC<SocialLinksPropsType> = ({ contacts }) => {
	return (
		<div className="socials">
			{Object
				.keys(contacts)
				.map((key) => {
					return contacts[key as keyof ContactsType] && <SocialsLink key={key as keyof ContactsType} name={key as keyof ContactsType} url={contacts[key as keyof ContactsType] || ''} />;
				})}
		</div>
	);
};
