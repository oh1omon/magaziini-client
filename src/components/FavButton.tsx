import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FAVS } from '../store/actions/favActions'

export default function FavButton({ id }: IFavButtonProps) {
	const dispatch = useDispatch()

	//Getting all favs array from the global state
	const favs: IFavs = useSelector((state: IRootState) => state.favs)

	//Once favs array has changed, we are updating it's version in local storage
	useEffect(() => {
		localStorage.setItem('favorite', JSON.stringify(favs))
	}, [favs])

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 */
	const FavHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		//Depending on presence of current item in favs array, we updating global favs state and then updating local storage via useEffect:
		if (!favs.includes(id)) {
			//Either, with this fav added to the favs array
			dispatch({ type: SET_FAVS, payload: [...favs, id] })
		} else {
			//Or, with this fav spliced from favs array
			const favIndex = favs.indexOf(id)
			favs.splice(favIndex, 1)
			dispatch({ type: SET_FAVS, payload: [...favs] })
		}
	}

	return (
		<button
			className={`flex items-center justify-center duration-150  border-2 border-black h-10 w-10 lg:h-14 lg:w-14  ${
				favs.includes(id)
					? 'bg-black text-white hover:bg-white hover:text-black'
					: 'bg-white text-black hover:bg-black hover:text-white'
			}`}
			onClick={(e) => FavHandler(e)}
		>
			<svg width='20' height='20' fill='currentColor'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
				/>
			</svg>
		</button>
	)
}
