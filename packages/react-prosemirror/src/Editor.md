An editor for content stored as ProseMirror JSON.

```js
// const { Editor, MenuBar } = require('@aeaton/react-prosemirror')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

const render = ({ editor, state, dispatch }) => (
  <div style={{background:'#eee',padding:5}}>
    <MenuBar menu={menu} state={state} dispatch={dispatch}/>
    {editor}
  </div>
);

initialState = {
  doc: {}
};

<div>
    <h2>Input</h2>
    
    <Editor 
      options={options}
      onChange={doc => setState({ doc })}
      render={render}
    />
    
    <h2>Output</h2>
    
    <pre><code>{JSON.stringify(state.doc, null, 2)}</code></pre>
</div>
```
