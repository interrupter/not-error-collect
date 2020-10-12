const Schema = require('mongoose').Schema;
module.exports = {
	ui:{
		component:'UIError',
		label: 'Подбробности ошибки',
		placeholder: 'Пусто',
		readonly: true
	},
	model:{
		type: Schema.Types.Mixed,
		required: false
	}
};
