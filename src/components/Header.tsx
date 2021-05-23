import React, { useEffect, useState } from 'react'
import Headroom from 'react-headroom'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { SET_SEX } from '../store/actions/sexActions'
import { Profile } from './Profile'
import { Logo } from './SVGs/Logo'

const Header = () => {
	const dispatch = useDispatch()
	const location = useLocation()

	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	//Retrieving sex identifier to show the right department of the clothes
	const sex = useSelector((state: IRootState) => state.sex)

	//Creating local state for showing or not the profile component
	const [profVisible, setProfVisible] = useState(false)

	/**
	 *
	 * @param {string} str type of sex
	 * Function dispatches a new selected type of sex to the global state
	 */
	const clickHandler = (str: string) => {
		dispatch({ type: SET_SEX, payload: str })
	}

	/**
	 *
	 * @param { React.MouseEvent<HTMLButtonElement, MouseEvent> } e
	 * Function toggles profVisible state
	 */
	const profileHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setProfVisible(!profVisible)
	}

	//It will listen for user global state changes and it is going to set showing of profile to false, if there is no user
	//It is needed, for example, when user decides to sign out, so we should not show profile to him anymore
	useEffect(() => {
		if (user === null) {
			setProfVisible(false)
		}
	}, [user])

	//It will listen for url location changes and it is going to set showing of profile to false, if it changes
	//It is needed, for example, when user goes to the another page, so we should not show profile to him anymore
	useEffect(() => {
		setProfVisible(false)
	}, [location.pathname])

	return (
		<Headroom style={{ zIndex: 10 }}>
			<div className='flex flex-row flex-wrap items-center justify-around w-full h-auto bg-gray-200 bg-opacity-75 border-b-4 border-black font-sans text-sm xl:text-2xl'>
				<div className='flex flex-wrap items-center justify-between h-auto pt-5 lg:py-5 w-9/10'>
					<div className='flex items-center justify-center w-1/2 lg:w-36 logo'>
						<HashLink to='/#top' smooth>
							<Logo />
						</HashLink>
					</div>
					<div className='flex-row items-center justify-around hidden lg:flex w-96'>
						<HashLink to='/#items' smooth>
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

						<HashLink to='/#items' smooth>
							<button
								className={`${
									sex === '' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
								} block px-6 py-1 duration-500 border-2 border-black `}
								onClick={() => clickHandler('')}
							>
								All
							</button>
						</HashLink>
						<HashLink to='/#items' smooth>
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
						{user ? (
							<button
								onClick={(e) => {
									profileHandler(e)
								}}
								className='px-4 py-1 text-xl duration-200 border-2 border-black lg:py-2 hover:text-white hover:bg-black '
							>
								{
									//Since I am building client-oriented shop, I need to say hello to the user personally
								}
								{`Hello, ${user.name.split(' ', 1)}!`}
							</button>
						) : (
							<Link
								to={'/login'}
								className='px-4 py-1 text-xl duration-200 border-2 border-black lg:py-2 hover:text-white hover:bg-black '
							>
								Sign In
							</Link>
						)}
					</div>
					<div className='flex items-center justify-center w-full h-16 lg:hidden '>
						<div className='flex flex-row items-center justify-between w-9/10'>
							<HashLink to='/#items' smooth>
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
							<HashLink to='/#items' smooth>
								<button
									className={`${
										sex === '' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
									} block px-6 py-1 duration-500 border-2 border-black `}
									onClick={() => clickHandler('')}
								>
									All
								</button>
							</HashLink>
							<HashLink to='/#items' smooth>
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
				{profVisible && <Profile clickHandler={setProfVisible} />}
			</div>
		</Headroom>
	)
}

export default Header
