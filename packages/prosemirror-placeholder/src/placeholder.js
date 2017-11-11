import { Plugin } from 'prosemirror-state'
import { DecorationSet, Decoration } from 'prosemirror-view'

import './placeholder.css'

const isEmpty = doc => (
  doc.childCount === 1 &&
  doc.firstChild.isTextblock &&
  doc.firstChild.content.size === 0
)

export default options => {
  return new Plugin({
    props: {
      decorations: state => {
        if (!isEmpty(state.doc)) return null

        const node = document.createElement('div')
        node.textContent = options.content
        node.className = 'placeholder'

        return DecorationSet.create(state.doc, [
          Decoration.widget(1, node)
        ])
      }
    }
  })
}
