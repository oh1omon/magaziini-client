import React from 'react'

export const News = () => {
	return (
		<div className='z-10 flex items-center justify-center  lg:overscroll-none text-xs bg-white w-full min-h-hero'>
			<div className='flex flex-col justify-between w-4/5 font-mono lg:font-sans text-xs text-justify h-260 text-opacity-80 my-12 leading-relaxed tracking-normal lg:text-xl'>
				<h1 className='font-sans text-xl lg:text-3xl'>Important News (very-very important)</h1>
				<p>
					Since Demo Day, I have done lots of work on this project, and now I am going to show you what
					exactly has been done!
				</p>
				<p>P.S. Feel free to contact me to get an admin account to test admin functionality!</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p>
					Let's start with the most important change! If you remember, on demo day, the whole site has
					been built on modals. Now it is not. Accessibility won! Fatality!
				</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p>My Magaziini has had a rebranding, and now it is Oh1omon studios! Wilkommen!</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p>Functional updates have got their place too:</p>
				<ul className={'list-inside list-disc ml-4 '}>
					<li>Every signed-in user can now see his orders, admin can see all the orders done;</li>
					<li>
						Item update has come. If you are the admin, you now can see an icon leading to the update
						page near delete icon on the Item Card;
					</li>
					<li>
						Validation has been added to all inputs on the site, so you hardly could submit the wrong
						info from the client-side to the rest server.
					</li>
				</ul>
				<p>P.S. Server has its validation too.</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p>No need to Sign Up before creating an order anymore! All of us like to be anonymous.</p>
				<div className='w-full border-b border-black border-opacity-80'></div>
				<p>
					Invisible but quite important changes have come to the heart of the project! Code has been
					cleaned up. Its readability has been enhanced much due to:
				</p>
				<ul className={'list-inside list-disc ml-4'}>
					<li>Comments. Every component is now filled with them;</li>
					<li>Reusability. For now, code is mostly optimized with reusable components;</li>
					<li>
						Clean code. Right now, it is much easier to read and scale the codebase due to big spring
						cleaning and optimization.
					</li>
				</ul>
			</div>
		</div>
	)
}
