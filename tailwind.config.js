module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			gridTemplateRows: {
				playoff: 'repeat(4, minmax(max-content, 1fr))',
			},
		},
	},
	plugins: [],
};
