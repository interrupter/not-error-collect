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
			sections:[{
				id: 		'system',
				title: 	'Система',
				place: 	'end'
			}],
			items: [{
				id: 			'',
				section: 	'system.errors',
				title: 		'Ошибки',
				url: 			'/error'
			}],
		},
		side: {
			sections:[{
				id: 'system',
				title: 'Система'
			}],
			items:[{
				id: 		 'system.errors',
				section: 'system',
				title: 		'Ошибки',
				url: 			'/error'
			}]
		}
	},
};

export {
	manifest,
	ncError
};
