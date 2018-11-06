const Schema = require('mongoose').Schema;

exports.thisModelName = 'Error';
exports.enrich = {
	versioning: false,
	increment: true
};

exports.thisSchema = {
	key: {
		type: String,
		required: true,
		searchable: true,
		sortable: true
	},
	error: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true
	},
	options: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true
	},
	env: {
		type: Schema.Types.Mixed,
		required: true,
		searchable: true,
		sortable: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
  updatedAt: {
		type: Date,
		default: Date.now
	},
};

exports.thisVirtuals = {};
exports.thisMethods = {};
