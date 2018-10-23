An editor for content stored as HTML.

Calls to the `onChange` handler are debounced to avoid unnecessary conversion to HTML, so the output will only update after a typing pause (or a maximum of 5 seconds).

```js
// const { HtmlEditor, MenuBar } = require('@aeaton/react-prosemirror')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

initialState = {
  value: `<h1>This is a title</h1><p>This is a paragraph.</p>`
};

const editorStyle = {
  background: '#eee',
  padding: 5
};

const onChange = value => {
  setState({ value })
};

<div>
    <h2>Input</h2>
    
    <HtmlEditor 
      options={options}
      value={state.value} 
      onChange={onChange}
      render={({ editor, view }) => (
        <div style={editorStyle}>
          <MenuBar menu={menu} view={view} />
          {editor}
        </div>
      )}
    />
    
    <h2>Output</h2>
    
    <pre style={{whiteSpace: 'pre-wrap'}}><code>{state.value}</code></pre>
</div>
```
