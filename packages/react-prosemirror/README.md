## Installation

`npm install @aeaton/react-prosemirror --save`

or

`yarn add @aeaton/react-prosemirror`

## Demo

[View demo](http://git.macropus.org/react-prosemirror/)

## Usage

This example imports configuration from [@aeaton/react-prosemirror-config-default](https://www.npmjs.com/package/@aeaton/react-prosemirror-config-default).

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

const Editor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    menu={menu}
    value={value}
    onChange={onChange}
  />
)

export default Editor
```

