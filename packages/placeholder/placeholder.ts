import './style/placeholder.css'

import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const placeholder = (): Plugin =>
  new Plugin({
    props: {
      decorations: (state) => {
        const decorations: Decoration[] = []

        if (state.doc.content.size === 2) {
          decorations.push(
            Decoration.node(0, 2, {
              class: 'empty-node',
            })
          )
        }

        // state.doc.descendants((node, pos) => {
        //   if (
        //     node.type.isBlock &&
        //     node.childCount === 0 &&
        //     node.content.size === 0
        //   ) {
        //     decorations.push(
        //       Decoration.node(pos, pos + node.nodeSize, {
        //         class: 'empty-node',
        //       })
        //     )
        //   }
        // })

        return DecorationSet.create(state.doc, decorations)
      },
    },
  })
