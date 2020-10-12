const
	UserActions = [
		'create'
	],
	AdminActions = [
		'create',
		'update',
		'get',
		'getRaw',
		'getById',
		'listAndCount',
		'delete'
	],
	MODEL_NAME = 'Error',
	MODEL_OPTIONS = {
		MODEL_NAME,
		MODEL_TITLE: 	'Ошибка',
		populate: {
			listAndCount: ['key'],
			get: ['key']
		},
		RESPONSE:{
			full: ['get', 'getRaw', 'create']
		}
	},
	modMeta = require('not-meta');

modMeta.extend(modMeta.Route, module.exports, AdminActions, MODEL_OPTIONS, '_');
modMeta.extend(modMeta.Route, module.exports, UserActions, MODEL_OPTIONS);
