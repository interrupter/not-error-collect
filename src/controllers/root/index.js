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
	menu:{
		top:{
			items: [{
				id: 			'system',
				section: 	'system.errors',
				title: 		'Ошибки',
				url: 			'/error'
			}],
		},
		side: {
			items:[{
				id: 		 'system.errors',
				section: 'system',
				title: 	 'Ошибки',
				url: 		 '/error'
			}]
		}
	},
};

export {
	manifest,
	ncError
};
