## Installation

`npm install @aeaton/react-prosemirror --save`

or

`yarn add @aeaton/react-prosemirror`

## Demo

[View demo](http://git.macropus.org/react-prosemirror/)

## Usage

The [`example`](example) folder contains ProseMirror configuration adapted from `prosemirror-schema-basic`.

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import * as options from './example'

import 'prosemirror-menu/style/menu.css'
import './example/style.css'

const Editor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
  />
)

export default Editor
```

