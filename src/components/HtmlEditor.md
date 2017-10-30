An editor for content stored as HTML.

Calls to the `onChange` handler are debounced to avoid unnecessary conversion to HTML, so the output will only update after a typing pause (or a maximum of 5 seconds).

```js
const { schema } = require('prosemirror-schema-basic')
const { exampleSetup } = require('prosemirror-example-setup')

require('prosemirror-menu/style/menu.css')
require('prosemirror-example-setup/style/style.css')
require('../styles.css')

const plugins = exampleSetup({ schema, floatingMenu: false })

initialState = {
  value: `<h1>This is a title</h1><p>This is a paragraph.</p>`
};


<div>
    <h2>Input</h2>
    
    <HtmlEditor 
      schema={schema}
      plugins={plugins}
      value={state.value} 
      onChange={value => setState({ value })}
    />
    
    <h2>Output</h2>
    
    <pre style={{whiteSpace: 'pre-wrap'}}><code>{state.value}</code></pre>
</div>
```
