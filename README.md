## Installation

`npm install @eaton/react-prosemirror --save`

or

`yarn add @eaton/react-prosemirror`

## Usage

Use `npm run styleguide` to see live examples in [the styleguide](http://git.macropus.org/react-prosemirror/).

Example usage, using `prosemirror-example-setup` to provide a menu bar, keymaps, etc:

```js
import React from 'react'
import { HtmlEditor } from '@aeaton/react-prosemirror'
import { schema } from 'prosemirror-schema-basic'
import { exampleSetup } from 'prosemirror-example-setup'

import 'prosemirror-menu/style/menu.css'
import 'prosemirror-example-setup/style/style.css'

const plugins = exampleSetup({ schema, floatingMenu: false })

const Editor = ({ value, onChange }) => (
  <HtmlEditor
    schema={schema}
    plugins={plugins}
    value={value}
    onChange={onChange}
  />
)

export default Editor
```
