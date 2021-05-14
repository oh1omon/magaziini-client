import React from 'react'
import { Error } from './SVGs/Error'
import { Okay } from './SVGs/Okay'
import { Send } from './SVGs/Send'

export const RenderSwitch = ({ param }: IRenderSwitchProps) => {
	//Defining on param passed inside the function it will render different icons

	switch (param) {
		//By passing 'error' as parameter it will render red cross
		case 'error':
			return <Error />

		//By passing 'info' as parameter it will render green check mark
		case 'info':
			return <Okay />

		//By default it will render send arrow
		default:
			return <Send />
	}
}
