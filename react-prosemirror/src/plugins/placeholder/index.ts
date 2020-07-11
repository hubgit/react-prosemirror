import { Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

interface Props {
  text: string
}

export const placeholder = <S extends Schema>({ text }: Props): Plugin<S> =>
  new Plugin<S>({
    props: {
      decorations: (state: EditorState<S>) => {
        const { childCount, firstChild } = state.doc

        if (
          childCount === 1 &&
          firstChild &&
          firstChild.type.name === 'paragraph' &&
          firstChild.childCount === 0
        ) {
          const decorations: Decoration[] = []

          decorations.push(
            Decoration.widget(0, () => {
              const placeholder = document.createElement('div')
              placeholder.className = 'ProseMirror-placeholder'
              placeholder.textContent = text
              return placeholder
            })
          )

          return DecorationSet.create<S>(state.doc, decorations)
        }

        return null
      },
    },
  })
