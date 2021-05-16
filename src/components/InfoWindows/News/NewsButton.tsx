import React from 'react'
import { useHistory } from 'react-router'

export const NewsButton = ({ setShowNews }: INewsButtonProps) => {
	const history = useHistory()

	//This handler is going set newsShown value to false in the localStorage for not-showing this button to the user anymore
	//It also deletes this button for current open page
	//And then redirect user to the last modal with the news about deleting modals from the project( ironic )
	const clickHandler = () => {
		setShowNews(false)
		window.localStorage.setItem('newsShown', 'true')
		history.push('/news')
	}

	return (
		<>
			<span
				className={
					'fixed z-10 bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 w-12 h-12 bg-white border-2 border-black animate-ping'
				}
			></span>
			<button
				onClick={clickHandler}
				className={
					'fixed z-10 bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 w-12 h-12 bg-white border-2 border-black text-3xl hover:bg-gray-200'
				}
			>
				!
			</button>
		</>
	)
}
