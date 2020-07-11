import { Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

interface Props {
  text: string
}

export const placeholder = <S extends Schema>(): Plugin<S> =>
  new Plugin<S>({
    props: {
      decorations: (state: EditorState<S>) => {
        const decorations: Decoration[] = []

        state.doc.descendants((node, pos) => {
          if (node.type.isBlock && node.childCount === 0) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: 'empty-node',
              })
            )
          }
        })

        return DecorationSet.create<S>(state.doc, decorations)
      },
    },
  })
