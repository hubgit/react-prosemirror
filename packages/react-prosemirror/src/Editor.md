An editor for content stored as ProseMirror JSON.

```js
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

initialState = {
  doc: {}
};

<div>
    <h2>Input</h2>
    
    <Editor 
      options={options}
      menu={menu}
      onChange={doc => setState({ doc })}
    />
    
    <h2>Output</h2>
    
    <pre><code>{JSON.stringify(state.doc, null, 2)}</code></pre>
</div>
```
