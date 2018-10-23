A React menu bar for a ProseMirror editor

```js
const { EditorState } = require('prosemirror-state')
const { EditorView } = require('prosemirror-view')
const { options, menu } = require('@aeaton/react-prosemirror-config-default')

const state = EditorState.create(options);

const view = EditorView.create({ state });

<MenuBar menu={menu} view={view} />
```
