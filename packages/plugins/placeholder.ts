import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const placeholder = new Plugin({
  props: {
    decorations: (state) => {
      const decorations: Decoration[] = []

      state.doc.descendants((node, pos) => {
        if (node.isBlock && !node.childCount && !node.content.size) {
          decorations.push(
            Decoration.node(pos, pos + node.nodeSize, {
              class: 'empty-node',
            })
          )
        }
      })

      return DecorationSet.create(state.doc, decorations)
    },
  },
})
