const
	UserActions = [
		'listAndCount',
		'create',
		'listAndCount',
		'create',
		'update',
		'get',
		'getRaw',
		'getById'
	],
	AdminActions = [
		'delete'
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
