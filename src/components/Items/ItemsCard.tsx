import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItem, retrieveItems } from '../../services/dispatchers'
import { SET_ITEMS } from '../../store/actions/itemActions'
import FavButton from '../FavButton'
import { Delete } from '../SVGs/Delete'
import { Edit } from '../SVGs/Edit'

const ItemCard = ({ id, name, description, img, price, url }: IItemCardProps) => {
	const dispatch = useDispatch()

	//Retrieving user from the state
	const user = useSelector((state: IRootState) => state.user)

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e Event
	 * Function performs checking if there is a user and if it is an admin, then if the user is admin it calls deleteItem function and after that prints to the console if the item has been deleted successfully or not
	 */
	const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		user &&
			user.type === 'admin' &&
			deleteItem(id).then((r) => {
				if (r) {
					retrieveItems().then((resp) => dispatch({ type: SET_ITEMS, payload: resp }))
					return console.log('successful delete')
				}
				return console.log('problem with deleting')
			})
	}

	return (
		<div className='relative flex flex-col m-8 overflow-hidden border-2 border-black w-105 h-140'>
			{
				//These buttons are only visible if you have admin account
			}
			<div className={` ${user && user.type === 'admin' ? 'absolute -top-1 -right-1 flex flex-row' : 'hidden'}`}>
				<Link to={`/updateitem/${id}`} className={' border-2 border-black pt-1 px-1 z-5 bg-white cursor-pointer'}>
					<Edit />
				</Link>
				<button
					onClick={(e) => deleteHandler(e)}
					className={' border-2 border-black pt-1 px-1 z-5 bg-white cursor-pointer'}
				>
					<Delete />
				</button>
			</div>
			{
				//Admin buttons ended
			}
			<div className='w-full h-full'>
				<img className='object-cover w-full h-full filter grayscale-40' src={`${img}`} alt={name + ' image'} />
			</div>
			<div className='absolute bottom-0 flex flex-row items-center justify-around w-full bg-white border-t-2 border-black lg:hidden h-1/4 bg-opacity-90'>
				<Link
					to={url}
					className='flex items-center justify-center w-2/3 py-2 text-2xl font-medium text-black uppercase duration-150 bg-white border-2 border-black hover:bg-gray-200'
				>
					{name}
				</Link>
			</div>
			<div className='flex-col items-center hidden duration-500 transform bg-white border-t-2 border-black lg:flex justify-evenly min-h-3/4 bg-opacity-90 -translate-y-1/4 hover:-translate-y-full'>
				<h2 className='text-3xl font-medium uppercase'>{name}</h2>
				{
					//Prints no more than 25 words of the description
				}
				<p className='w-3/4 font-mono text-sm text-justify'>{`${description.split(' ', 25).join(' ')}...`}</p>
				<h3 className='font-mono text-2xl font-bold uppercase'>{price}$</h3>
				<div className='flex flex-row justify-between w-3/4'>
					<Link
						to={url}
						className='flex items-center justify-center w-2/3 py-2 text-black duration-150 bg-white border-2 border-black hover:bg-gray-200'
					>
						Read More
					</Link>
					<FavButton id={id} />
				</div>
			</div>
		</div>
	)
}

export default ItemCard
