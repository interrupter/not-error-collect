import ncError from './ncError.js';

let manifest = {
	router: {
		manifest: [
			{
				paths: ['error\/([^\/]+)\/([^\/]+)', 'error\/([^\/]+)', 'error'],
				controller: ncError
			}
		]
	},
	menu:[{
		title: 	'Ошибки',
		items:[{
			title: 'Список',
			url: '/error'
		}]
	}],
};

export {
	manifest,
	ncError
};
