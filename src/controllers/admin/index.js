import ncError from './ncError';

let manifest = {
	router: {
		manifest: [
			{
				paths: ['error'],
				controller: ncError
			}
		]
	},
	templates: {},
	paths: {}
};

export {ncError, manifest};
