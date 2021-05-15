import React from 'react'
import { useSelector } from 'react-redux'
import { CheckOrdersLink } from '../ProfileParts/CheckOrdersLink'
import { CreateItemLink } from '../ProfileParts/CreateItemLink'
import { ProfilePart } from '../ProfileParts/ProfilePart'
import { SignOutBtn } from '../ProfileParts/SignOutBtn'
import { PasswordChange } from './PasswordChange'

export const Profile = ({ clickHandler }: IProfileProps) => {
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
						<div className={'lg:hidden w-4/5 h-full'}></div>
						<svg
							onClick={() => clickHandler()}
							className='transform -translate-x-1/2 -rotate-180 w-6 h-6 text-black cursor-pointer absolute left-1/2 right-1/2 bottom-4'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
						</svg>
					</>
				)}
			</div>
		</div>
	)
}
