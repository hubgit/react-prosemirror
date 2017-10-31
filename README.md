## Installation

`npm install @aeaton/react-prosemirror --save`

or

`yarn add @aeaton/react-prosemirror`

## Demo

[View demo](http://git.macropus.org/react-prosemirror/)

## Usage

The [`src/config`](src/config) folder contains an example of ProseMirror configuration, adapted from `prosemirror-schema-basic`.

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import options from '../config'

import 'prosemirror-menu/style/menu.css'
import '../config/style.css'

const Editor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
  />
)

export default Editor
```

