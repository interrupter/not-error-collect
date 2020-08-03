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
				title: 	'Система'
			}],
			items: [{
				section: 'system',
				title: 	'Ошибки',
				url: '/error'
			}],
		},
		side: {
			sections:[{
				id: 'system',
				title: 'Система'
			}],
			items:[{
				section: 'system',
				title: 	'Ошибки',
				items:[{
					title: 'Список',
					url: '/error'
				}]
			}]
		}
	},
};

export {
	manifest,
	ncError
};
