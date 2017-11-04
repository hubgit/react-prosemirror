An editor for content stored as HTML.

Calls to the `onChange` handler are debounced to avoid unnecessary conversion to HTML, so the output will only update after a typing pause (or a maximum of 5 seconds).

```js
// const { HtmlEditor, MenuBar } = require('@aeaton/react-prosemirror')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')
const classes = require('./demo.css')

const render = ({ editor, state, dispatch }) => (
  <div className={classes.root}>
    <MenuBar menu={menu} state={state} dispatch={dispatch}/>
    {editor}
  </div>
);

initialState = {
  value: `<h1>This is a title</h1><p>This is a paragraph.</p>`
};

const onChange = value => {
  setState({ value })
};

<div>
    <h2>Input</h2>
    
    <HtmlEditor 
      options={options}
      render={render}
      value={state.value} 
      onChange={onChange}
    />
    
    <h2>Output</h2>
    
    <pre style={{whiteSpace: 'pre-wrap'}}><code>{state.value}</code></pre>
</div>
```
