## Installation

`npm install @aeaton/react-prosemirror --save`

or

`yarn add @aeaton/react-prosemirror`

## Demo

[View demo](https://react-prosemirror-example.now.sh/)

## Usage

This example imports configuration from [@aeaton/react-prosemirror-config-default](https://www.npmjs.com/package/@aeaton/react-prosemirror-config-default).

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import { options } from '@aeaton/react-prosemirror-config-default'

const CustomEditor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
  />
)

export default CustomEditor
```

Use a `render` prop to add the menu bar:

```js
import React from 'react'
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

const CustomEditor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
    render={({ editor, view }) => (
      <div>
        <MenuBar menu={menu} view={view} />
        {editor}
      </div>
    )}
  />
)

export default CustomEditor
```

## Development

1. Run `lerna run build`
2. Run `lerna publish`
3. Run `lerna run deploy`
