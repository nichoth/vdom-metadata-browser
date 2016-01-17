var state = require('@nichoth/state');
var oArray = require('observ-array');
var extend = require('xtend');
var observ = require('observ');
var ValueItem = require('./ValueListItem');

module.exports = FieldItem;

function FieldItem(opts) {
  opts = opts || {};
  opts.field = opts.field || {};
  opts.field.values = opts.field.values || [];
  opts.fetchNodesFn = opts.fetchNodesFn || function(){};

  var s = state({
    fieldName: observ(opts.field.name || ''),
    values: oArray(opts.field.values.map(function(v) {
      return ValueItem({
        value: v,
        queryFn: opts.fetchNodesFn.bind(null, {
          predicate: opts.field.index,
          object: v.index
        })
      });
    })),
  });

  return s;
}

FieldItem.render = function(h, state) {
  return h('div.vdom-metadata-field-list', [
    state.fieldName,
    h('ul', [
      state.values.map(function(v) {
        return h('li.slog-value-item', [
          ValueItem.render(h, v)
        ]);
      })
    ])
  ]);
};


