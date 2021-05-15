import React from 'react'
import { useSelector } from 'react-redux'
import { CheckOrdersLink } from '../ProfileParts/CheckOrdersLink'
import { CreateItemLink } from '../ProfileParts/CreateItemLink'
import { ProfilePart } from '../ProfileParts/ProfilePart'
import { SignOutBtn } from '../ProfileParts/SignOutBtn'
import { PasswordChange } from './PasswordChange'

export const Profile = () => {
	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	return (
		<div className={`w-full h-64 lg:h-32 flex flex-row justify-center items-center`}>
			<div className={'lg:w-9/10 w-4/5 h-full flex flex-col lg:flex-row justify-around items-center'}>
				{user && (
					<>
						<ProfilePart children={<PasswordChange />} />
						{user!.type === 'admin' && <ProfilePart children={<CreateItemLink />} />}
						<ProfilePart children={<CheckOrdersLink />} />
						<ProfilePart children={<SignOutBtn />} />
					</>
				)}
			</div>
		</div>
	)
}
