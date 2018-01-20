An editor for content stored as ProseMirror JSON.

```js
// const { Editor, MenuBar } = require('@aeaton/react-prosemirror')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

initialState = {
  doc: {}
};

const editorStyle = {
  background: '#eee',
  padding: 5
};

<div>
    <h2>Input</h2>
    
    <Editor 
      options={options}
      placeholder="Enter some text…"
      autoFocus
      onChange={doc => setState({ doc })}
      render={({ editor, state, dispatch }) => (
        <div style={editorStyle}>
          <MenuBar menu={menu} state={state} dispatch={dispatch}/>
          {editor}
        </div>
      )}
    />
    
    <h2>Output</h2>
    
    <pre><code>{JSON.stringify(state.doc, null, 2)}</code></pre>
</div>
```
