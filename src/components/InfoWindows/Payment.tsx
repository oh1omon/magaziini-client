import React from 'react'

export const Payment = () => {
	return (
		<div className='z-10 flex items-center justify-center  overflow-y-scroll lg:overscroll-none text-xs bg-white w-full min-h-hero'>
			<div className='flex flex-col justify-between w-4/5 font-mono lg:font-sans text-xs text-justify h-128 lg:h-140 text-opacity-80 my-12'>
				<h1 className='font-sans text-3xl'>Online Payment On Our Website </h1>
				<p className='text-xs lg:text-lg'>
					Online payment with credit card is possible in case of order with delivery and order with pickup.
				</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p className='text-xs lg:text-lg'>To pay online, please select item Online Payment on the Checkout page.</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p className='text-xs lg:text-lg'>
					After you have chosen suitable goods, go to the Bag and input you contact data, choose Delivery or Pickup.
					Fill in delivery address and choose pickup point. Then select Online Payment and click on Confirm the Order.
				</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p className='text-xs lg:text-lg'>
					To make a payment, you will have to provide your credit card details. Transfer of this data is made in
					compliance with all necessary security rules.
				</p>
			</div>
		</div>
	)
}
