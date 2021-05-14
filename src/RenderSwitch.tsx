import React from 'react'
import { Error } from './components/SVGs/Error'
import { Okay } from './components/SVGs/Okay'
import { Send } from './components/SVGs/Send'

export const RenderSwitch = ({ param }: IRenderSwitchProps) => {
	switch (param) {
		case 'error':
			return <Error />
		case 'info':
			return <Okay />
		default:
			return <Send />
	}
}
