import React from 'react'
import { IModalProps } from '../react-app-env'

export const ProfilePart = ({ children }: IModalProps) => {
	return <div className={'lg:w-1/5 w-4/5 h-full flex justify-center items-center'}>{children}</div>
}
