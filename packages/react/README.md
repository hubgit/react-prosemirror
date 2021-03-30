## Installation

`npm install @aeaton/react-prosemirror`

or

`yarn add @aeaton/react-prosemirror`

## Usage

This example imports configuration from [@aeaton/react-prosemirror-config-default](https://www.npmjs.com/package/@aeaton/react-prosemirror-config-default).

```jsx
import { HtmlEditor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'

const initialValue = '<p></p>'

export const RichTextEditor = () => {
  const [value, setValue] = useState(initialValue)

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
