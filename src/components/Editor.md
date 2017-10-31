An editor for content stored as ProseMirror JSON.

```js
const options = require('../config')

require('prosemirror-menu/style/menu.css')
require('../config/style.css')
require('../styles.css')

initialState = {
  doc: {}
};

<div>
    <h2>Input</h2>
    
    <Editor 
      options={options}
      onChange={doc => setState({ doc })}
    />
    
    <h2>Output</h2>
    
    <pre><code>{JSON.stringify(state.doc, null, 2)}</code></pre>
</div>
```
