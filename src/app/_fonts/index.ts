import localFont from 'next/font/local';

export const ProximaNova = localFont({
	src: [
		{
			path: './proximanova_regular.ttf',
			style: 'normal',
			weight: '400',
		},
		{
			path: './proximanova_bold.otf',
			style: 'normal',
			weight: '700',
		},
		{
			path: './proximanova_extrabold.otf',
			style: 'normal',
			weight: '800',
		},
		{
			path: './proximanova_black.otf',
			style: 'normal',
			weight: '900',
		},
	],
});
