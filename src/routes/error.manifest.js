module.exports = {
	model: 'error',
	url: '/api/:modelName',
	fields: {
		key: {
			type: 'textfield',
			disabled: true,
			placeholder: 'key',
			label: 'Key'
		},
    error: {
			type: 'textfield',
			placeholder: 'Error',
			label: 'Error'
		},
		options: {
			type: 'textfield',
			placeholder: 'Options',
			label: 'Options'
		},
		env: {
			type: 'textfield',
			placeholder: 'Environment',
			label: 'Environment'
		},
		createdAt: {
			type: 'textfield',
			disabled: true,
			placeholder: 'Created at',
			label: 'Created at'
		},
		updatedAt: {
			type: 'textfield',
			disabled: true,
			placeholder: 'Updated at',
			label: 'Updated at'
		},
		submit: {
			type: 'submit'
		}
	},
	actions: {
		//ключи это название действий
		create: {
			method: 'PUT',
			isArray: false,
			data: ['record'],
			rules:[
				{
					auth: false
				},
				{
					admin: true
				}
			],
			title: 'Creation of new error',
			fields: {
				admin: [
					'key',
					'error',
					'options',
					'env',
					'createdAt', 'updatedAt',
					'submit'
				]
			}
		},
    listAndCount: {
			method: 'GET',
			isArray: false,
			data: ['pager', 'sorter', 'filter'],
			rules: [{
				auth: 	true,
				admin: 	true
			}]
		},
		get: {
			method: 'GET',
			isArray: false,
			postFix: '/:record[_id]',
			data: [],
			rules: [{
				auth: 	true,
				admin: 	true
			}],
			title: 'Details of error',
			fields: {
				admin: [
					'key',
					'error',
					'options',
					'env',
					'createdAt',
					'updatedAt'
				]
			}
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
			auth: true,
			admin: true
		}
	}
};
