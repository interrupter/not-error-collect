import Validators from '../common/validators.js';
import Common from '../common';
import {
  ncCRUD
} from 'not-bulma';

const MODULE_NAME = '';
const MODEL_NAME = 'Error';

const LABELS = {
  plural: 'Ошибки',
  single: 'Ошибка',
};


class ncError extends ncCRUD {
  constructor(app, params) {
    super(app, `${MODULE_NAME}.${MODEL_NAME}`);
    this.setModuleName(MODULE_NAME.toLowerCase());
    this.setModelName(MODEL_NAME.toLowerCase());
    this.setOptions('names', LABELS);
    this.setOptions('role', 'root');
    this.setOptions('Validators', Validators);
    this.setOptions('params', params);
    this.setOptions('list', {
      interface: {
        factory: this.make.error,
        combined: true,
        combinedAction: 'listAndCount'
      },
      pager: {
        size: 100,
        page: 0
      },
      sorter: {
				id: -1
			},
      showSelect: true,
      showSearch: true,
      idField: '_id',
      fields: [{
        path: ':errorID',
        title: 'ID',
        searchable: true,
        sortable: true
      }, {
        path: ':key.title',
        title: 'From',
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
            },
            {
              action: this.goUpdate.bind(this, value),
              title: 'Изменить',
              size: 'small'
            },
            {
              action: this.goDelete.bind(this, value),
              type: 'danger',
              title: 'Удалить',
              size: 'small',
              style: 'outlined'
            }
          ];
        },
      }]
    });
    this.start();
    return this;
  }

  createDefault() {
    return {};
  }

}

export default ncError;
