/* global notFramework */

class ncError extends notFramework.CRUDController {
	constructor(app, params) {
		super(app);
		this.setModuleName('error');
		this.setOptions('names', {
			plural: 'Ошибки',
			single: 'Ошибка',
		});
		this.setOptions('params', params);
		this.setOptions('role', 'admin');
		this.setOptions('containerSelector', this.app.getOptions('crud.containerSelector'));
		this.log('artist interface');
		this.setOptions('views', {
			default:{
				renderFromURL: false,
				common: false,
				prefix: 'content-',
				postfix: '',
			},
			update: {
				preload: {},
				action: 'update',
				renderFromURL: false,
				name:'content-edit',
				prefix: 'form-',
				targetQuery: '#form-place',
				helpers: {}
			},
			list: {
				interface:	{
					combined:	true
				},
				targetQuery: '#table-place',
				prefix: 'content-',
				postfix: '',
				endless: false,
				renderFromURL: false,
				name: 'list',
				common: false,
				preload: {},
				fields: [{
					path: ':errorID',
					title: 'ID',
					searchable: true,
					sortable: true
				}, {
					path: ':key.title',
					title: 'Key',
					sortable: true,
					searchable: true
				}, {
					path: 	':env.date.timestamp',
					title: 	'Timestamp',
					sortable: true,
					searchable: true,
					preprocessor: (value) => {
						let t = new Date(parseInt(value));
						return t.toLocaleString('ru-RU');
					}
				},
				{
					path: ':details.message',
					title: 'Сообщение',
					sortable: true,
					searchable: true
				},
				{
					path: ':_id',
					title: 'Действия',
					preprocessor: (value) => {
						return {
							links:[
								{
									url: [this.getModelURL(), value, 'update'].join('/'),
									title: 'Изменить'
								},
								{
									url: [this.getModelURL(), value, 'delete'].join('/'),
									title: 'Удалить'
								}
							]
						};
					},
					component: {
						template: {
							name: 'links'
						}
					}
				}]
			}
		});
		this.route(params);
		return this;
	}
}

export default ncError;
