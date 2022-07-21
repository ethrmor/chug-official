module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				main: '#B01717',
				'dark-bg': '#222222',
				'dark-surface': '#303030',
				'dark-hover': '#353535',
				'dark-line': '#444444',
				'dark-text': '#FFFFFF',
				'dark-text-2': '#999999',
				'dark-nav': '#121212',
				'light-bg': '#ECECEC',
				'light-surface': '#FFFFFF',
				'light-hover': '#E7E7E7',
				'light-line': '#DDDDDD',
				'light-text': '#000000',
				'light-text-2': '#A9A9A9',
				'ethan-1': '#4B2E83',
				'ethan-2': '#4B9CD3',
				'cameron-1': '#03202F',
				'cameron-2': '#A71930',
				'jacob-1': '#000000',
				'jacob-2': '#FB4F14',
				'jorden-1': '#17256D',
				'jorden-2': '#E35224',
				'brian-1': '#262626',
				'brian-2': '#BF5700',
				'scott-1': '#01A263',
				'scott-2': '#2C4697',
				'shawn-1': '#B22234',
				'shawn-2': '#3C3B6E',
				'dan-1': '#20062A',
				'dan-2': '#20B396',
				'lucas-1': '#C90005',
				'lucas-2': '#008542',
				'morgan-1': '#CB2026',
				'morgan-2': '#2F8ACC',
				'juice-1': '#046307',
				'juice-2': '#9300A9',
				'caleb-1': '#24AB3D',
				'caleb-2': '#E75829',
			},
			gridTemplateRows: {
				playoff: 'repeat(4, minmax(max-content, 1fr))',
			},
		},
	},
	plugins: [],
};
