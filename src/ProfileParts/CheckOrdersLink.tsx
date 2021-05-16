import React from 'react'
import { Link } from 'react-router-dom'

export const CheckOrdersLink = () => {
	return (
		<Link
			to={'/orders'}
			className={`flex items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
		>
			Check Orders
		</Link>
	)
}
