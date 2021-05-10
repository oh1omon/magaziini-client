import React, { useState } from 'react'
import { addItem } from '../../services/dispatchers'
import Validator from '../../services/validator'
import Modal from './Modal'

export default function WorkingModal() {
	const [form, setForm] = useState<ICreateItemProps>({})
	const [info, setInfo] = useState({ type: '', message: '' })
	const [err, setErr] = useState<string[]>([])

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		e.preventDefault()
		if (e.target instanceof HTMLInputElement) {
			if (e.target.files) return setForm({ ...form, [e.target.name]: e.target.files[0] })
		}
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const sendHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setErr([])
		const validationResult = Validator.createItem(form)
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}
		console.log(form.sizes)
		typeof form.sizes !== 'object' && true && setForm({ ...form, sizes: form!.sizes!.split(' ') })
		console.log(form.sizes)

		addItem(form).then((r) => {
			setInfo({ type: r.type, message: r.message })
		})
	}
	return (
		<Modal>
			<div
				className='fixed z-10 flex items-center justify-center w-3/4 overflow-y-scroll text-xs bg-white border-4 border-black lg:w-2/3 h-9/10 bg-opacity-90'
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className={`flex flex-col lg:flex-row items-center 
						'justify-between'
					 w-4/5 h-auto lg:h-4/5 text-xs`}
				>
					<>
						<div className='flex flex-col items-center justify-center w-auto h-auto mb-4 lg:mb-0 lg:w-2/5'>
							<label htmlFor={'file'}>Insert here image of the future Item</label>
							<input onChange={(e) => changeHandler(e)} type={'file'} id={'file'} name={'photo'} />
						</div>
						<div className='w-full h-full lg:w-2/5'>
							<form className='flex flex-col justify-between h-full' encType='multipart/form-data'>
								<div className='mb-4 lg:mb-0 flex flex-col'>
									<label htmlFor={'name'}>Name</label>
									<textarea
										onChange={(e) => changeHandler(e)}
										id={'name'}
										name={'name'}
										className={`border-2 font-sans text-xl h-1/2 tracking-wide uppercase ${
											err.includes('name') ? 'border-red-700' : 'border-black'
										}`}
									></textarea>
								</div>
								<div className='mb-4 lg:mb-0 flex flex-col'>
									<label htmlFor={'description'}>Description</label>
									<textarea
										onChange={(e) => changeHandler(e)}
										id={'description'}
										name={'description'}
										className={`border-2 font-mono w-full h-64 text-xs text-justify lg:text-sm text-opacity-80 ${
											err.includes('description') ? 'border-red-700' : 'border-black'
										}`}
									></textarea>
								</div>
								<div className='flex flex-col items-baseline mb-4 lg:mb-0'>
									<label htmlFor={'sizes'}>Sizes</label>
									<textarea
										onChange={(e) => changeHandler(e)}
										id={'sizes'}
										name={'sizes'}
										className={`border-2 font-mono text-lg w-3/4 h-1/2 tracking-wide lg:text-2xl ${
											err.includes('sizes') ? 'border-red-700' : 'border-black'
										}`}
									></textarea>
								</div>
								<div className='flex flex-col items-baseline mb-4 lg:mb-0'>
									<label htmlFor={'sex'}>Sex</label>
									<select
										onChange={(e) => changeHandler(e)}
										id={'sex'}
										name={'sex'}
										className={`border-2 font-mono text-sm w-3/4 h-1/2 tracking-wide lg:text-sm ${
											err.includes('sex') ? 'border-red-700' : 'border-black'
										}`}
									>
										<option value=''>Select sex</option>
										<option value={'w'}>Female</option>
										<option value={'m'}>Male</option>
									</select>
								</div>
								<div className='mb-4 lg:mb-0 flex flex-col'>
									<label htmlFor={'price'}>Price</label>
									<textarea
										onChange={(e) => changeHandler(e)}
										id={'price'}
										name={'price'}
										className={`border-2 font-mono text-lg w-1/4 h-1/2 tracking-wide lg:text-2xl ${
											err.includes('price') ? 'border-red-700' : 'border-black'
										}`}
									></textarea>
								</div>
								<div className='mb-4 lg:mb-0'>
									<p
										className={`${
											info.type === 'info' ? 'text-blue-700' : 'text-red-700'
										} font-mono text-xs text-justify lg:text-sm`}
									>
										{info.message}
									</p>
								</div>
								<div className='flex flex-row justify-between w-full mb-4 lg:mb-0'>
									<button
										onClick={(e) => {
											sendHandler(e)
										}}
										className='flex items-center justify-center w-3/5 py-1 font-sans text-xl duration-150 bg-white border-2 border-black xl:w-3/4 xl:py-2 xl:text-2xl hover:bg-blue-400'
									>
										Create
									</button>
								</div>
							</form>
						</div>
					</>
				</div>
			</div>
		</Modal>
	)
}
