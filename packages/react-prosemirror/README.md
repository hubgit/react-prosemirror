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
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

const render = ({ editor, state, dispatch }) => (
  <div>
    <MenuBar menu={menu} state={state} dispatch={dispatch}/>
    {editor}
  </div>
);

const CustomEditor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    render={render}
    value={value}
    onChange={onChange}
  />
)

export default CustomEditor
```

