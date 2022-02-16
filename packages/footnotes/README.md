This plugin is adapted from [the ProseMirror footnote example](https://prosemirror.net/examples/footnote/).

```js
// schema
import { footnote, footnoteView } from '@dear-rama/prosemirror-footnotes'

const nodes = {
  footnote,
  // ...
}

const nodeViews = {
  footnote: footnoteView,
  // ...
}
```
