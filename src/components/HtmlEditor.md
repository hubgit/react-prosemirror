An editor for content stored as HTML.

Calls to the `onChange` handler are debounced to avoid unnecessary conversion to HTML, so the output will only update after a typing pause (or a maximum of 5 seconds).

```js
const options = require('../../example')

require('prosemirror-menu/style/menu.css')
require('../../example/style.css')
require('../../styleguide/style.css')

initialState = {
  value: `<h1>This is a title</h1><p>This is a paragraph.</p>`
};


<div>
    <h2>Input</h2>
    
    <HtmlEditor 
      options={options}
      value={state.value} 
      onChange={value => setState({ value })}
    />
    
    <h2>Output</h2>
    
    <pre style={{whiteSpace: 'pre-wrap'}}><code>{state.value}</code></pre>
</div>
```
