# vdom metadata browser

UI for viewing fields and values.

[demo](http://hallowed-letters.surge.sh/vdom-metadata-browser)


## install

    $ npm install vdom-metadata-browser


## example

```js
var DataBrowser = require('vdom-metadata-browser');
var loop = require('vdom-loop');
var h = loop.h;

var data = [
  {
    name: 'texture',
    index: 'field-texture',
    values: [
      { name: 'gossamer', index: 'value-gossamer' },
      { name: 'greasy', index: 'value-greasy' }
    ]
  },
  {
    name: 'species',
    index: 'field-species',
    values: [
      { name: 'vulcan', index: 'value-vulcan' },
      { name: 'klingon', index: 'value-klingon' }
    ]
  }
];

var state = DataBrowser({
  fields: data,
  fetchNodesFn: console.log.bind(console, 'fetch'),
  onDelete: console.log.bind(console, 'delete'),
  onSave: function(value, done) {
    console.log(value);
    done();
  }
});

var el = loop(state, DataBrowser.render.bind(null, h));
document.body.appendChild(el);
```
