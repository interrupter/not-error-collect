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
	['env', {label: 'Окружение'}, 'json']
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
					admin: true
				},
				{
					auth: false
				}
			],
			title: 'Creation of new error',
			fields: {
				admin: [
					'key',
					'details',
					'env',
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
				'options',
				'env',
				'createdAt'
			],
			rules: [{
				auth: true,
				admin: true
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
				admin: true
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
				admin: true
			}]
		},
		getRaw: {
			method: 'GET',
			isArray: false,
			postFix: '/:record[errorID]/:actionName',
			data: [],
			rules: [{
				auth: true,
				admin: true
			}]
		},
		delete: {
			method: 'DELETE',
			postFix: '/:record[_id]',
			isArray: false,
			rules: [{
				auth: true,
				admin: true
			}]
		}
	}
};
