import React from 'react'
import Headroom from 'react-headroom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { ReactComponent as Logo } from '../logo.svg'
import { SET_SEX } from '../store/actions/sexActions'

const Header = () => {
	const dispatch = useDispatch()

	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	//Retrieving sex identifier to show the right department of the clothes
	const sex = useSelector((state: IRootState) => state.sex)

	/**
	 *
	 * @param {string} str type of sex
	 * Function dispatches a new selected type of sex to the global state
	 */
	const clickHandler = (str: string) => {
		dispatch({ type: SET_SEX, payload: str })
	}

	return (
		<Headroom style={{ zIndex: 10 }}>
			<div className='flex flex-row flex-wrap items-center justify-around w-full h-auto bg-gray-200 bg-opacity-75 border-b-4 border-black font-sans text-sm xl:text-2xl'>
				<div className='flex flex-wrap items-center justify-between h-auto pt-5 lg:py-5 w-9/10'>
					<div className='flex items-center justify-center w-1/2 lg:w-36 logo'>
						<Link to='/'>
							<Logo className={'w-28 sm:w-full'} />
						</Link>
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
							{
								//Since I am building client-oriented shop, I need to say hello to the user personally
							}
							{user ? `Hello, ${user.name.split(' ', 1)}!` : 'Sign In'}
						</Link>
					</div>
					<div className='flex items-center justify-center w-full h-16 lg:hidden '>
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
