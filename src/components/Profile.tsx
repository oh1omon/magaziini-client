import React from 'react'
import { useSelector } from 'react-redux'
import { CheckOrdersLink } from '../ProfileParts/CheckOrdersLink'
import { CreateItemLink } from '../ProfileParts/CreateItemLink'
import { ProfilePart } from '../ProfileParts/ProfilePart'
import { SignOutBtn } from '../ProfileParts/SignOutBtn'
import { Arrow } from './SVGs/Arrow'
import { UserUpdateLink } from './UserUpdateLink'
import { IProfileProps, IRootState } from '../react-app-env'

export const Profile = ({ clickHandler }: IProfileProps) => {
	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	return (
		<div className={`w-full h-64 lg:h-32 flex flex-row justify-center items-center`}>
			<div className={'lg:w-9/10 w-4/5 h-full flex flex-col lg:flex-row justify-around items-center'}>
				{user && (
					<>
						<ProfilePart children={<UserUpdateLink />} />
						{user!.type === 'admin' && <ProfilePart children={<CreateItemLink />} />}
						<ProfilePart children={<CheckOrdersLink />} />
						<ProfilePart children={<SignOutBtn />} />
						{
							//This div is needed, so we can beautifully center our arrow for closing profile
						}
						<div className={'lg:hidden w-4/5 h-full'}></div>
						<Arrow clickHandler={clickHandler} />
					</>
				)}
			</div>
		</div>
	)
}
