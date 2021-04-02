# react-prosemirror

A React component for [ProseMirror](http://prosemirror.net/).

## Packages

* [@aeaton/react-prosemirror](packages/react) - React components
* [@aeaton/prosemirror-commands](packages/commands) - ProseMirror commands
* [@aeaton/prosemirror-schema](packages/schema) - ProseMirror schema definitions (marks and nodes)
* [@aeaton/prosemirror-transformers](packages/transformers) - conversion to/from ProseMirror
* [@aeaton/react-prosemirror-config-default](packages/config-default) - an example configuration ready for use
* [@aeaton/prosemirror-placeholder](packages/placeholder) - ProseMirror placeholder plugin (decoration and style)
* [@aeaton/prosemirror-footnotes](packages/footnotes) - ProseMirror footnotes plugin (schema and node view)

## Demo

* [demo](demo) - a fully-configured editor

## Usage

### Quickstart: HTML Editor

```js
import { useState } from 'react'
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'

const initialValue = '<p></p>'

export const App = () => {
  const [value, setValue] = useState(initialValue)

  console.log({ value })

  return (
    <HtmlEditor
      schema={schema}
      plugins={plugins}
      value={initialValue}
      handleChange={setValue}
      debounce={250}
    >
      <Toolbar toolbar={toolbar} />
      <Editor autoFocus />
    </HtmlEditor>
  )
}
```

### Custom Editor

Create a schema:

```js
import { Schema } from 'prosemirror-model'

const schema = new Schema({
  nodes: {
    // a text node
    text: {},
    // a top-level doc node, which can contain at least one paragraph
    doc: { 
      content: 'paragraph+'
    },
    // a paragraph node, which can contain some text nodes, represented in HTML as `<p>`
    paragraph: { 
      content: 'text*',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
  },
  marks: {
    // a strong mark, represented in HTML as `<strong>`
    strong: {
      parseDOM: [{ tag: 'strong' }],
      toDOM: () => ['strong', 0],
    },
    // an emphasis mark, represented in HTML as `<em>`
    emphasis: {
      parseDOM: [{ tag: 'em' }],
      toDOM: () => ['em', 0],
    }
  }
})
```

Create some commands:

```js
import { toggleMark } from 'prosemirror-commands'

const toggleMarkStrong = toggleMark(schema.marks.strong)
const toggleMarkEmphasis = toggleMark(schema.marks.emphasis)
```


Create plugins for handling history and key presses:

```js
import { baseKeymap } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { history, undo, redo } from 'prosemirror-history'

const plugins = [
  history(),
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    'Meta-b': toggleMarkStrong,
    'Meta-i': toggleMarkEmphasis,
  }),
  keymap(baseKeymap),
]
```

Create a toolbar definition:

```js
import { isMarkActive } from '@aeaton/prosemirror-commands'

const toolbar = [
  {
    id: 'marks',
    items: [
      {
        id: 'toggle-strong',
        content: icons.strong,
        action: toggleMarkStrong,
        enable: toggleMarkStrong,
        active: isMarkActive(schema.marks.strong),
      },
      {
        id: 'toggle-emphasis',
        title: 'Toggle emphasis',
        content: icons.emphasis,
        action: toggleMarkEmphasis,
        enable: toggleMarkEmphasis,
        active: isMarkActive(schema.marks.emphasis),
      },
    ]
  }
]
```

Create a doc by parsing some HTML:

```js
import { createHTMLTransformer } from '@aeaton/prosemirror-transformers'

const transformer = createHTMLTransformer(schema)

const doc = transformer.parse('<p>Hello World!</p>')
```

Connect everything together to make your editor:

```jsx
const CustomEditor = () => {
  return (
    <EditorProvider doc={doc} plugins={plugins}>
      <Toolbar toolbar={toolbar} />
      <Editor />
    </EditorProvider>
  )
}
```

The editor state is available in descendants of `EditorProvider` via a `useEditorState` hook:

```js
import { useEditorState } from '@aeaton/react-prosemirror'

const ExampleComponent = () => {
  const state = useEditorState()
  
  // do something with the current state
}
```

The editor view is available in descendants of `EditorProvider` via a `useEditorView` hook:

```js
import { useEditorView } from '@aeaton/react-prosemirror'

const ExampleComponent = () => {
  const view = useEditorView()
  
  // do something with the view
}
```

## Components

### EditorProvider

The `EditorProvider` component takes optional `schema` (or `doc`), `plugins` and `editorProps` props, uses them to create a new ProseMirror state and view, then makes the state and view available in React's context via `useEditorState` and `useEditorView` hooks.

### Editor

The `Editor` component renders the ProseMirror view into a DOM element.

### Toolbar

The `Toolbar` component takes a `toolbar` prop describing the toolbar (an array of grouped toolbar items) and renders a toolbar.

Each toolbar item has `content` (e.g. an icon), `action` (a command that's run when the button is pressed), plus optional `active` (whether the item is currently active) and `enable` (whether the item is currently enabled) props.

### ChangeHandler

The `ChangeHandler` component makes it easy to listen for changes to the ProseMirror document.

When the document changes, after an optional `debounce`, it's run through the `transformer` then passed to the `handleChange` callback.

## Styles

Each component has a class so it can be styled with CSS, and several of the styles can also be altered using CSS variables. 

See [the demo styles](https://github.com/hubgit/react-prosemirror/tree/main/demo/styles) for examples of this.
