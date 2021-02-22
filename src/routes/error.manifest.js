const initFromSchema = require('not-node').Fields.fromSchema;
const modelSchema = require('../models/error').thisSchema;

const FIELDS = initFromSchema(modelSchema, [
	'_id',
	['errorID', {}, 'ID'],
	['key', {
		label: 'Key',
		placeholder: 'Key'
	}, 'userId'],
	['details', {}, 'error'],
	['options', {label: 'Дополнительная информация'}, 'json'],
	['parent', {label: 'Исходная ошибка'}, 'error'],
	['env', {label: 'Окружение'}, 'json'],
	['hashDetails', 	{	label: 'hash деталей ошибки'	}, 'hash'],
	['hashOptions', 	{	label: 'hash дополнительных данных'}, 'hash'],
	['hashParent', 	{	label: 'hash исходной ошибки'}, 'hash'],
	['hashEnv', {	label: 'hash данных окружения'	}, 'hash'],
	['repetitionDetails', {label: 'Ошибок с такими же деталями'} , 'counter'],
	['repetitionOptions', {label: 'Ошибок с такими же доп. данными'} , 'counter'],
	['repetitionParent', {label: 'Ошибок с такой же исходной'} , 'counter'],
	['repetitionEnv', {label: 'Ошибок в таком же окружении'} , 'counter'],
]);

module.exports = {
	model: 'error',
	url: '/api/:modelName',
	fields: FIELDS,
	actions: {
		//ключи это название действий
		create: {
			method: 'PUT',
			isArray: false,
			data: ['record'],
			rules: [{
					root: true
				},
				{
					auth: false
				}
			],
			title: 'Creation of new error',
			fields: {
				root: [
					'key',
					'details',
					'env',
					'parent',
					'options',
					'createdAt', 'updatedAt',
					'submit'
				]
			}
		},
		listAndCount: {
			method: 'GET',
			isArray: false,
			postFix: '/:actionName',
			data: ['pager', 'sorter', 'filter', 'search', 'return'],
			fields: [
				'_id',
				'errorID',
				'key',
				'details',
				'parent',
				'options',
				'env',
				'hashDetails',
				'hashParent',
				'hashOptions',
				'hashEnv',
				'repetitionDetails',
				'repetitionOptions',
				'repetitionParent',
				'repetitionEnv',
				'createdAt',
			],
			rules: [{
				auth: true,
				root: true
			}, {
				auth: true,
				role: ['admin']
			}]
		},
		get: {
			method: 'GET',
			isArray: false,
			postFix: '/:record[_id]',
			data: [],
			rules: [{
				auth: true,
				root: true
			}, {
				auth: true,
				role: ['admin']
			}],
			title: 'Details of error',
			fields: [
				'errorID',
				'key',
				'details',
				'options',
				'env',
				'parent',
				'hashDetails',
				'hashOptions',
				'hashParent',
				'hashEnv',
				'repetitionDetails',
				'repetitionOptions',
				'repetitionParent',
				'repetitionEnv',
				'createdAt'
			]
		},
		getById: {
			method: 'GET',
			isArray: false,
			postFix: '/:record[errorID]/:actionName',
			data: [],
			rules: [{
				auth: true,
				root: true
			}]
		},
		getRaw: {
			method: 'GET',
			isArray: false,
			postFix: '/:record[errorID]/:actionName',
			data: [],
			rules: [{
				auth: true,
				root: true
			}]
		},
		delete: {
			method: 'DELETE',
			postFix: '/:record[_id]',
			isArray: false,
			rules: [{
				auth: true,
				root: true
			}]
		}
	}
};
