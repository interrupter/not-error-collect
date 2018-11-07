const 
	UserActions = [
		'create'
	],
	AdminActions = [
		'listAndCount',
		'create',
		'update',
		'delete',
		'get',
		'getRaw',
		'getById'
	],
	MODEL_NAME = 'Error',
	MODEL_OPTIONS = {
		MODEL_NAME,
		MODEL_TITLE: 	'Ошибка'
	},
	modMeta = require('not-meta');

module.exports = {};

modMeta.extend(modMeta.Route, module.exports, AdminActions, MODEL_OPTIONS, '_');
modMeta.extend(modMeta.Route, module.exports, UserActions, MODEL_OPTIONS);
