This plugin is adapted from [the ProseMirror footnote example](https://prosemirror.net/examples/footnote/).

```js
// plugins
import { footnotes } from '@aeaton/prosemirror-footnotes'

const plugins = [
  footnotes()
]

// schema
import { footnoteNodes } from '@aeaton/prosemirror-footnotes'

const nodes = {
  ...footnoteNodes
}
```
