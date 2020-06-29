const Schema = require('mongoose').Schema;
const App = require('not-node').Application;

exports.thisModelName = 'Error';
exports.enrich = {
	versioning: false,
	increment: true
};

exports.thisSchema = {
	key: {
		type: 			Schema.Types.ObjectId,
		ref: 				'Key',
		required: 	true,
		searchable: true,
		sortable: 	true
	},
	details: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true,
		properties: {
			String: [
				'name',
				'message',
				'stack'
			]
		},
	},
	options: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true,
		properties: {
			String: [''],
			Number: [''],
			Boolean: ['']
		},
	},
	env: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true,
		properties: {
			String: [''],
			Number: [''],
			Boolean: ['browser', 'node']
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
		searchable: true
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
};

exports.thisStatics = {
	collect(report, key, type){
		let Error = App.getModel('not-error-collect//Error');
		if(type === 'error'){
			let val = {
				key: 			key._id,
				details:	report.details,
				options: 	report.options,
				env: 			report.env
			};
			return Error.add(val);
		}else{
			return Promise.resolve();
		}
	}
};

exports.thisVirtuals = {};
exports.thisMethods = {};
