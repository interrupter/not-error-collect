module.exports = {
  ui:{
    component: 'UITextfield',
    label: 'Счетчик',
    placeholder: '0'
  },
  model:{
    type: Number,
    default: 0,
    required: true,
    searchable: true,
    sortable: true
  }
};
