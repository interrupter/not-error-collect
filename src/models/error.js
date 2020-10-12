const log = require('not-log')(module, 'Error Model');
try {
	const App = require('not-node').Application;
	const initFields = require('not-node').Fields.initFields;
	const crypto = require('crypto');

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
			searchable: true,
			properties: {
				String: [
					'name',
					'message',
					'stack'
				]
			},
		}, 'error'],
		['options', {
			required: true,
			searchable: true,
			properties: {
				String: [''],
				Number: [''],
				Boolean: ['']
			},
		}, 'json'],
		['env', {
			required: true,
			searchable: true,
			properties: {
				String: [''],
				Number: [''],
				Boolean: ['browser', 'node']
			},
		}, 'json'],
		['hashDetails', 	{}, 'hash'],
		['hashOptions', 	{}, 'hash'],
		['hashEnv', {}, 'hash'],
		['repetitionDetails', {} , 'counter'],
		['repetitionOptions', {} , 'counter'],
		['repetitionEnv', {} , 'counter'],
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
		createObjectHash(val){
			if(typeof val === 'object'){
				const hasher = crypto.createHash('sha256');
				hasher.update(JSON.stringify(val));
				return hasher.digest('hex');
			}else{
				return undefined;
			}
		},
		async collect(report, key, type) {
			try{
				if (type === 'error') {
					let Error = App.getModel('not-error-collect//Error');
					let val = {
						key: 			key._id,
						details: 	report.details,
						options: 	report.options,
						env: 			report.env
					};
					if(val.details){
						val.hashDetails = Error.createObjectHash(val.details);
					}
					if(val.options){
						val.hashOptions = Error.createObjectHash(val.options);
					}
					if(val.env){
						let dateBack = val.env.date.timestamp;
						delete val.env.date.timestamp;
						val.hashEnv = Error.createObjectHash(val.env);
						val.env.date.timestamp = dateBack;
					}
					val.repetitionDetails = await Error.countWithFilter({key: key._id, hashDetails: val.hashDetails});
					val.repetitionOptions = await Error.countWithFilter({key: key._id, hashOptions: val.hashOptions});
					val.repetitionEnv = 		await Error.countWithFilter({key: key._id, hashEnv: val.hashEnv});
					return Error.add(val);
				} else {
					return;
				}
			}catch(e){
				log.error(e);
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
