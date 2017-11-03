A React menu bar for a ProseMirror editor

```js
const { EditorState } = require('prosemirror-state')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

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
