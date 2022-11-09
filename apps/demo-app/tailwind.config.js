const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const mode = process.env.TAILWIND_MODE || process.env.NODE_ENV === 'production' ? 'aot' : 'jit';

const purgeArray = [
	join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
	...createGlobPatternsForDependencies(__dirname),
];

module.exports = {
	mode,
	content: [...purgeArray],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: ['disabled'],
	plugins: [require('@tailwindcss/forms')],
};
