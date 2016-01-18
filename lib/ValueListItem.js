var state = require('@nichoth/state');
var oArray = require('observ-array');
var extend = require('xtend');
var CrudItem = require('vdom-crud-li');
var observ = require('observ');
var h = require('virtual-dom/h');
var noop = function(){};

module.exports = ValueListItem;

function ValueListItem(opts) {
  opts = opts || {};
  opts.value = opts.value || {};
  opts.queryFn = opts.queryFn || noop;
  opts.onDelete = opts.onDelete || noop;
  opts.onSave = opts.onSave || noop;

  var s = state({
    crudder: CrudItem({
      value: opts.value.name || '',
      textNodeFn: function(val) {
        return Link('/', val, opts.queryFn);
      },
      deleteFn: function() {
        opts.onDelete(opts.value);
      },
      saveFn: function(value, done) {
        opts.onSave(extend(opts.value, {name: value}), done);
      }
    })
  });

  function Link(url, words, queryFn) {
    return h('a.vdom-metadata-value-label', {
      href: url,
      onclick: function(ev) {
        ev.preventDefault();
        queryFn();
      }
    }, [words]);
  }

  return s;
}

ValueListItem.render = function(h, state) {
  return h('div', CrudItem.render(h, state.crudder));
};

