module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			gridTemplateRows: {
				10: 'repeat(10, minmax(0, 1fr))',
			},
		},
	},
	plugins: [],
};
