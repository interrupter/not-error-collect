/* global notFramework */

class ncErrorCollect extends notFramework.CRUDController {
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
		this.log('error interface');
		let formHelpers = {

		};
		this.setOptions('views', {
			default:{
				renderFromURL: false,
				common: false,
				postfix: '',
			},
			create: {
				preload: {},
				action: 'create',
				renderFromURL: false,
				name:'edit',				
				targetQuery: '#form-place',
				helpers: formHelpers
			},
			update: {
				preload: {},
				action: 'update',
				renderFromURL: false,
				name:'edit',
				targetQuery: '#form-place',
				helpers: formHelpers
			},
			list: {
				interface:	{
					combined:	true
				},
				helpers:{
					createURL: [this.getModelURL(),'create'].join('/')
				},
				targetQuery: '#table-place',
				postfix: '',
				endless: false,
				renderFromURL: false,
				name: 'list',
				common: false,
				preload: {},
				fields: [{
					path: ':id',
					title: 'ID',
					searchable: true,
					sortable: true
				}, {
					path: ':title',
					title: 'Название',
					sortable: true,
					searchable: true
				}, {
					path: ':thumb',
					title: 'Превью',
					sortable: true,
					searchable: true,
					preprocessor: (value, item) => {
						return {
							url: item.thumb ? item.thumb : '',
						};
					},
					component: {
						template: {
							name: 'image'
						}
					}
				},{
					path: ':priority',
					title: 'Приоритет',
					sortable: true,
					searchable: true,
					preprocessor: (value, item) => {
						return {
							value,
							less:{
								action: ()=>{
									this.log('less.action');
									item.priority = parseInt(item.priority) - 1;
									window.nrCollection({_id: item._id})
										.$decreasePriority()
										.then(()=>{
											this.view.tableView.refreshBody();
										});
								},
								title: 'Ниже'
							},
							more:{
								action: ()=>{
									this.log('more.action');
									item.priority = parseInt(item.priority) + 1;
									window.nrCollection({_id: item._id})
										.$increasePriority()
										.then(()=>{
											this.view.tableView.refreshBody();
										});
								},
								title: 'Выше'
							},

						};
					},
					component: {
						template: {
							name: 'number-editable'
						}
					}
				},{
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

export default ncErrorCollect;
