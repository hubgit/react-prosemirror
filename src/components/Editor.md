An editor for content stored as ProseMirror JSON.

```js
const { schema } = require('prosemirror-schema-basic')
const { exampleSetup } = require('prosemirror-example-setup')

require('prosemirror-menu/style/menu.css')
require('prosemirror-example-setup/style/style.css')
require('../styles.css')

const plugins = exampleSetup({ schema, floatingMenu: false })

initialState = {
  value: {}
};

<div>
    <h2>Input</h2>
    
    <Editor 
      plugins={plugins}
      schema={schema} 
      onChange={value => setState({ value })}
    />
    
    <h2>Output</h2>
    
    <pre><code>{JSON.stringify(state.value, null, 2)}</code></pre>
</div>
```
