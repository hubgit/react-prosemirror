A React menu bar for a ProseMirror editor

```js
const options = require('@aeaton/react-prosemirror-config-full')
const { icons } = require('@aeaton/react-prosemirror-icons-fontawesome')
const { EditorState } = require('prosemirror-state')

const menu = options.menu(options.schema, icons);

initialState = {
  state: EditorState.create(options)
};

<MenuBar 
  menu={menu}
  state={state.state}
  dispatch={transaction => {
    setState({ 
      state: state.state.apply(transaction)
    })
  }}
/>
```
