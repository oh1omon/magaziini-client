import React from 'react'
import Headroom from 'react-headroom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { SET_SEX } from '../store/actions/sexActions'

const Header = ({ user }: IHeaderProps) => {
	const dispatch = useDispatch()
	const sex = useSelector((state: IRootState) => state.sex)
	const clickHandler = (str: string) => {
		dispatch({ type: SET_SEX, payload: str })
		// setSex(str)
	}

	return (
		<Headroom style={{ zIndex: 10 }}>
			<div className='flex flex-row flex-wrap items-center justify-around w-full h-auto bg-blue-500 bg-opacity-75 border-b-4 border-black '>
				<div className='flex flex-wrap items-center justify-between h-auto pt-5 lg:py-5 w-9/10'>
					<div className='flex items-center justify-center w-1/2 lg:w-36 logo'>
						<HashLink to='#top' smooth={true}>
							<h1 className='text-4xl'>
								my<span className='font-bold'>Shop</span>
							</h1>
						</HashLink>
					</div>
					<div className='flex-row items-center justify-around hidden lg:flex w-96'>
						<HashLink to='#items' smooth>
							<button
								className={`${
									sex === 'm'
										? 'bg-black text-white'
										: 'transition-all duration-500 ease-out bg-left-bottom bg-gradient-to-l from-black-hard to-transparent-hard bg-200-100 hover:bg-right-bottom hover:text-white'
								} block px-6 py-1  border-t-2 border-b-2 border-r-2 border-black `}
								onClick={() => clickHandler('m')}
							>
								Men
							</button>
						</HashLink>
						<HashLink to='#items' smooth>
							<button
								className={`${
									sex === '' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
								} block px-6 py-1 duration-500 border-2 border-black `}
								onClick={() => clickHandler('')}
							>
								All
							</button>
						</HashLink>
						<HashLink to='#items' smooth>
							<button
								className={`${
									sex === 'w'
										? 'bg-black text-white'
										: 'transition-all duration-500 ease-out bg-right-bottom bg-gradient-to-r from-black-hard to-transparent-hard bg-200-100 hover:bg-left-bottom hover:text-white'
								} block px-6 py-1  border-t-2 border-b-2 border-l-2 border-black `}
								onClick={() => clickHandler('w')}
							>
								Women
							</button>
						</HashLink>
					</div>
					<div className='flex items-center justify-center w-1/2 lg:w-40'>
						<Link
							to={'/user'}
							className='px-4 py-1 text-xl duration-200 border-2 border-black lg:py-2 hover:text-white hover:bg-black '
						>
							{user ? `Hello, ${user.name.split(' ', 1)}!` : 'Sign In'}
						</Link>
					</div>
					<div className='flex items-center justify-center w-full h-16 lg:hidden '>
						{/* <svg
							className='w-6 h-6 text-black animate-bounce'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path fill='currentCollor' d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
						</svg> */}
						<div className='flex flex-row items-center justify-between w-9/10'>
							<HashLink to='#items' smooth>
								<button
									className={`${
										sex === 'm'
											? 'bg-black text-white'
											: 'transition-all duration-500 ease-out bg-left-bottom bg-gradient-to-l from-black-hard to-transparent-hard bg-200-100 hover:bg-right-bottom hover:text-white'
									} block px-6 py-1  border-t-2 border-b-2 border-r-2 border-black `}
									onClick={() => clickHandler('m')}
								>
									Men
								</button>
							</HashLink>
							<HashLink to='#items' smooth>
								<button
									className={`${
										sex === '' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
									} block px-6 py-1 duration-500 border-2 border-black `}
									onClick={() => clickHandler('')}
								>
									All
								</button>
							</HashLink>
							<HashLink to='#items' smooth>
								<button
									className={`${
										sex === 'w'
											? 'bg-black text-white'
											: 'transition-all duration-500 ease-out bg-right-bottom bg-gradient-to-r from-black-hard to-transparent-hard bg-200-100 hover:bg-left-bottom hover:text-white'
									} block px-6 py-1  border-t-2 border-b-2 border-l-2 border-black `}
									onClick={() => clickHandler('w')}
								>
									Women
								</button>
							</HashLink>
						</div>
					</div>
				</div>
			</div>
		</Headroom>
	)
}

export default Header
