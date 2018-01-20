import { Plugin } from 'prosemirror-state'
import FootnoteView from './FootnoteView'

import './footnotes.css'

export default options => {
  return new Plugin({
    props: {
      nodeViews: {
        footnote: (node, view, getPos) => {
          return new FootnoteView(node, view, getPos)
        }
      }
    }
  })
}
