import React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from './Subscribe'

export default function Footer() {
	return (
		<div className='flex items-center justify-center w-full h-auto text-gray-700 bg-blue-400 border-t-4 border-black lg:h-96 '>
			<div className='flex flex-col items-center justify-between w-4/5 lg:flex-row h-4/5'>
				<div className='w-full h-full pb-6 lg:w-1/3'>
					<h2 className='w-full py-4 uppercase border-b border-gray-700 lg:w-4/5'>Customer info</h2>
					<p className='py-1 font-mono text-sm text-justify lg:py-3 '>
						<Link to='/payment' className='duration-200 hover:text-black'>
							Payment
						</Link>
					</p>
					<p className='py-1 font-mono text-sm text-justify lg:py-3'>
						<Link to='/delivery' className='duration-200 hover:text-black'>
							Delivery
						</Link>
					</p>
					<p className='py-1 font-mono text-sm text-justify lg:py-3'>
						<Link to='/returnsPolicy' className='duration-200 hover:text-black'>
							Returns Policy
						</Link>
					</p>
				</div>
				<div className='w-full h-full pb-6 lg:w-1/3'>
					<h2 className='w-full py-4 uppercase border-b border-gray-700 lg:w-4/5'>About us</h2>
					<p className='py-1 font-mono text-sm text-justify lg:py-3'>
						<Link to='/contacts' className='duration-200 hover:text-black'>
							Contacts
						</Link>
					</p>
					<p className='py-1 font-mono text-sm text-justify lg:py-3 '>
						<Link to='/history' className='duration-200 hover:text-black'>
							Our history
						</Link>
					</p>
				</div>
				<div className='w-full h-full pb-6 lg:w-1/3'>
					<h2 className='w-full py-4 uppercase border-b border-gray-700 lg:w-4/5'>Newsletter</h2>
					<p className='w-full py-5 font-mono text-sm text-justify lg:w-4/5'>
						Yep, we have 10% discount for subscribers to our newsletter, too! &#127770;
					</p>
					<Subscribe />
				</div>
			</div>
		</div>
	)
}
