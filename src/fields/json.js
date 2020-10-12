const Schema = require('mongoose').Schema;
module.exports = {
	ui:{
		component:'UIJSON',
		label: 'JSON данные',
		placeholder: 'Пусто',
		readonly: true
	},
	model:{
		type: Schema.Types.Mixed,
		required: false,
		searchable: false,
		sortable: false
	}
};
