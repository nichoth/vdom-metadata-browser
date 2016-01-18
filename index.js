var observ = require('observ');
var state = require('@nichoth/state');
var oArray = require('observ-array');
var extend = require('xtend');
var FieldItem = require('./lib/FieldItemView');
var noop = function(){};

module.exports = FieldListView;

function FieldListView(opts) {

  opts = opts || {};
  opts.fetchNodesFn = opts.fetchNodesFn || noop;
  opts.onDelete = opts.onDelete || noop;
  opts.onSave = opts.onSave || noop;
  opts.fields = opts.fields || [];

  var s = state({
    fetchNodesFn: observ(opts.fetchNodesFn),
    fields: oArray( opts.fields.map(function(f) {
      return FieldItem({
        field: f,
        fetchNodesFn: opts.fetchNodesFn,
        onDelete: opts.onDelete,
        onSave: opts.onSave
      });
    }))
  });

  return s;
}

FieldListView.set = function(state, fields) {
  state.fields.set(fields.map(function(f) {
    return FieldItem({
        field: f,
        fetchNodesFn: state().fetchNodesFn
      });
  }));
};

FieldListView.render = function(h, state) {
  return h('div', [
    state.fields.map(function(f) {
      return FieldItem.render(h, f);
    })
  ]);
};
