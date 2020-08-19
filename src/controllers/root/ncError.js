const ERROR_DEFAULT = 'Что пошло не так.';
import {
  Breadcrumbs,
  Table as notTable,
  UIError,
  notController,
  notCommon
} from 'not-bulma';

import Common from '../common/index.js';
import UIDetails from '../common/ui.error.details.svelte';

const LABELS = {
  plural: 'Ошибки',
  single: 'Ошибка',
};

const BREADCRUMBS = [{
  title: LABELS.plural,
  url: '/error'
}];

class ncError extends notController {
  constructor(app, params) {
    super(app);
    this.setModuleName('error');
    this.setOptions('names', LABELS);
    this.setOptions('role', 'root');
    this.setOptions('containerSelector', this.app.getOptions('crud.containerSelector'));
    this.log('error interface');
    this.ui = {};
    this.els = {};
    this.buildFrame();
    Breadcrumbs.setHead(BREADCRUMBS).render({
      root: app.getOptions('router:root'),
      target: this.els.top,
      navigate: (url) => app.getWorking('router').navigate(url)
    });
    this.route(params);
    return this;
  }


  setBreadcrumbs(tail) {
    Breadcrumbs.setTail(tail).update();
  }

  buildFrame() {
    let el = document.querySelector(this.app.getOptions('crud.containerSelector', 'body'));
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    this.els.top = document.createElement('div');
    this.els.top.id = 'crud-top';
    this.els.top.classList.add('box');
    el.appendChild(this.els.top);
    this.els.main = document.createElement('div');
    this.els.main.id = 'crud-main';
    this.els.main.classList.add('box');
    el.appendChild(this.els.main);
    this.els.bottom = document.createElement('div');
    this.els.bottom.id = 'crud-bottom';
    this.els.bottom.classList.add('box');
    el.appendChild(this.els.bottom);
  }

  route(params = []) {
    if (params.length == 1) {
      if (params[0] === 'create') {
        return this.runCreate(params);
      } else {
        return this.runDetails(params);
      }
    } else if (params.length == 2) {
      if (params[1] === 'delete') {
        return this.runDelete(params);
      } else if (params[1] === 'update') {
        return this.runUpdate(params);
      } else {
        let routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[1]);
        if (this[routeRunnerName] && typeof this[routeRunnerName] === 'function') {
          return this[routeRunnerName](params);
        }
      }
    }
    return this.runList(params);
  }

  runDetails(params) {
    this.setBreadcrumbs([{
      title: 'Подробности',
      url: `/error/${params[0]}`
    }]);

    if (this.ui.details) {
      return;
    } else {
      this.$destroyUI();
    }
    this.make.error({
        _id: params[0]
      }).$get().then((res) => {
        if (res.status === 'ok') {
          let item = notCommon.stripProxy(res.result);
					if (item.details && item.details.stack){
						item.details.stack = item.details.stack.replace(/([^>])\n/g, '$1<br/>');
					}
					if (item.options){
						item.options = JSON.stringify(item.options, null, 4);
						item.options = item.options.replace(/([^>])\n/g, '$1<br/>');
					}

					if (item.env){
						if(item.env.date && item.env.date.timestamp && item.env.date.offset){
							item.datetime = Common.LocalizeTimestamp(item.env.date.timestamp, item.env.date.offset);
						}
						item.env = JSON.stringify(item.env, null, 4);
						item.env = item.env.replace(/([^>])\n/g, '$1<br/>');
					}
          this.ui.details = new UIDetails({
            target: this.els.main,
            props: {
              item
            }
          });
        } else {
          this.ui.error = new UIError({
            target: this.els.main,
            props: {
              title: 'Произошла ошибка',
              message: res.error ? res.error : ERROR_DEFAULT
            }
          });
        }
      })
      .catch(this.error.bind(this));
  }

  runList() {
    this.setBreadcrumbs([{
      title: 'Список',
      url: `/error`
    }]);

    if (this.ui.list) {
      return;
    } else {
      this.$destroyUI();
    }

    this.ui.list = new notTable({
      options: {
        targetEl: this.els.main,
        interface: {
          combined: true,
            factory: this.make.error
        },
        endless: false,
        preload: {},
        sorter: {
          errorID: -1
        },
        actions: [],
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
          path: ':env.date',
          title: 'Timestamp',
          sortable: true,
          searchable: true,
          preprocessor: (value) => {
            return Common.LocalizeTimestamp(value.timestamp, value.offset)
          }
        }, {
          path: ':details.message',
          title: 'Сообщение',
          sortable: true,
          searchable: true
        }, {
          path: ':_id',
          title: 'Действия',
          type: 'button',
          preprocessor: (value) => {
            return [{
              action: this.goDetails.bind(this, value),
              title: 'Подробнее',
              size: 'small'
            }];
          }
        }]
      }
    });
  }

  $destroyUI() {
    for (let name in this.ui) {
      this.ui[name].$destroy && this.ui[name].$destroy();
      delete this.ui[name];
    }
  }

  goCreate() {
    this.app.getWorking('router').navigate('/' + [this.getModelURL(), 'create'].join('/'));
  }

  goDetails(value) {
    this.app.getWorking('router').navigate('/' + [this.getModelURL(), value].join('/'));
  }

  goUpdate(value) {
    this.app.getWorking('router').navigate('/' + [this.getModelURL(), value, 'update'].join('/'));
  }

  goDelete(value) {
    this.app.getWorking('router').navigate('/' + [this.getModelURL(), value, 'delete'].join('/'));
  }

  goList() {
    this.app.getWorking('router').navigate('/' + this.getModelURL());
  }

  createDefault() {
    return {};
  }
  showResult(ui, res) {
    ui.resetLoading();
    if (Common.isError(res)) {
      notCommon.report(res);
    } else {
      if (res.errors && Object.keys(res.errors).length > 0) {
        if (!Array.isArray(res.error)) {
          res.error = [];
        }
        Object.keys(res.errors).forEach((fieldName) => {
          ui.setFieldInvalid(fieldName, res.errors[fieldName]);
          res.error.push(...res.errors[fieldName]);
        });
      }
      if (res.error) {
        ui.setFormError(res.error);
      }
      if (!res.error) {
        ui.showSuccess();
      }
    }
  }

}

export default ncError;
