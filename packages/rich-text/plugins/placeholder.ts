import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

import { EditorSchema } from '../schema'

export const placeholder: Plugin<EditorSchema> = new Plugin<EditorSchema>({
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
