/**
 * Input objects containing base information about every input for SignIn/Up component
 */
const inputObjects = [
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'email',
		type: 'email',
		placeholder: 'E-mail',
		activated: true,
	},
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'password',
		type: 'password',
		placeholder: 'Password',
		activated: true,
	},
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'name',
		type: 'text',
		placeholder: 'Your name',
		activated: false,
	},
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'street',
		type: 'text',
		placeholder: 'Your street',
		activated: false,
	},
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'city',
		type: 'text',
		placeholder: 'Your city',
		activated: false,
	},
	{
		className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
		name: 'country',
		type: 'text',
		placeholder: 'Your country',
		activated: false,
	},
]

export default inputObjects
