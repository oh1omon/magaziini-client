import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useHistory } from 'react-router-dom'
import usePortal from '../../services/hooks/usePortal'

/**
 *
 * @param {JSX.IntrinsicElements.div} children HTML Div element we are going to put inside the modal
 * @returns acutal modal
 */
const Modal = ({ children }: IModalProps) => {
	//Getting target HTML element from my custom hook
	const target = usePortal()

	//We will need this history API to close modal when the user clicks outside it's square
	let history = useHistory()

	//When the modal mounts we set "outside background" to hidden, so we can't move and interact with it
	//When modal is unmounted we returning default setting to background overflow
	useEffect((): any => {
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = 'unset')
	}, [])

	//Appends out children div to the target element we have received from our hook
	return createPortal(
		<div
			className='fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full h-full text-xs bg-black bg-opacity-40 lg:text-lg'
			onClick={() => history.goBack()}
		>
			{children}
		</div>,
		target
	)
}

export default Modal
