var Dispatcher = require('../dispatcher/app_dispatcher');
var Constants = require('../constants')

module.exports = {
  create: function() {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.CREATE
    });
  },
  update: function(id, field, value) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.UPDATE,
      id: id,
      field: field,
      value: value
    });
  }
};
