## Installation

`npm install @aeaton/react-prosemirror --save`

or

`yarn add @aeaton/react-prosemirror`

## Demo

[View demo](http://git.macropus.org/react-prosemirror/)

## Usage

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import * as options from '@aeaton/react-prosemirror-config-default'

const Editor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
  />
)

export default Editor
```

