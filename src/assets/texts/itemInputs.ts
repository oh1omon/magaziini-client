/**
 * Input objects containing base information about every input for Working component
 */
const itemInputs = [
	{
		className: `border-2 p-2 font-sans text-sm tracking-wide uppercase`,
		name: 'name',
		type: 'text',
		label: 'Item name',
	},
	{
		className: `border-2 p-2 font-sans text-sm tracking-wide `,
		name: 'description',
		type: 'textarea',
		label: 'Item description',
	},
	{
		className: `border-2 p-2 font-sans text-sm tracking-wide `,
		name: 'photo',
		type: 'text',
		label: 'Image url',
	},
	{
		className: `border-2 p-2 font-sans text-sm tracking-wide uppercase`,
		name: 'sizes',
		type: 'text',
		label: 'Sizes (divide them with space)',
	},
	{
		className: `border-2 p-2 font-sans text-sm tracking-wide uppercase`,
		name: 'price',
		type: 'text',
		label: 'Price',
	},
]

export default itemInputs
