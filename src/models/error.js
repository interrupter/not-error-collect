const log = require('not-log')(module, 'Error Model');
try {
	const App = require('not-node').Application;
	const initFields = require('not-node').Fields.initFields;

	const MODEL_NAME = 'Error';

	const FIELDS = [
		[
			'key',
			{
				ref: 'Key',
				required: true
			},
			'userId'
		],
		['details', {
			required: true,
			properties: {
				String: [
					'name',
					'message',
					'stack'
				]
			},
		}, 'json'],
		['options', {
			required: true,
			properties: {
				String: [''],
				Number: [''],
				Boolean: ['']
			},
		}, 'json'],
		['env', {
			required: true,
			properties: {
				String: [''],
				Number: [''],
				Boolean: ['browser', 'node']
			},
		}, 'json'],
		'createdAt',
		'updatedAt'
	];

	exports.keepNotExtended = false;
	exports.thisModelName = MODEL_NAME;
	exports.thisSchema = initFields(FIELDS, 'model');

	exports.enrich = {
		versioning: false,
		increment: true
	};

	exports.thisStatics = {
		collect(report, key, type) {
			if (type === 'error') {
				let Error = App.getModel('not-error-collect//Error');
				let val = {
					key: key._id,
					details: report.details,
					options: report.options,
					env: report.env
				};
				return Error.add(val);
			} else {
				return Promise.resolve();
			}
		}
	};

	exports.thisVirtuals = {};
	exports.thisMethods = {};

	const metaExtend = require('not-meta').extend;
	const metaModel = require('not-meta').Model;

	const ActionList = ['search'];
	metaExtend(metaModel, exports.thisStatics, ActionList, {
		MODEL_NAME
	});

} catch (e) {
	log.error(e);
}
