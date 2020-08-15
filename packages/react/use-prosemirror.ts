import { Transformer } from '@pompom/core'
import { Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import { useEffect, useState } from 'react'

export const useProseMirror = <T, S extends Schema>({
  schema,
  plugins,
  value,
  handleChange,
  transformer,
  editorProps = {},
}: {
  schema: S
  plugins: Plugin<unknown, S>[]
  value: T
  handleChange: (value: T) => void
  transformer: Transformer<T, S>
  editorProps?: EditorProps<unknown, S>
}) => {
  const [state, setState] = useState<EditorState<S>>(
    EditorState.create({
      doc: transformer.import(value),
      plugins,
    })
  )

  const [view] = useState<EditorView<S>>(
    new EditorView(undefined, {
      ...editorProps,
      state: EditorState.create({ schema }),
      dispatchTransaction: function (tr) {
        const { state, transactions } = this.state.applyTransaction(tr)

        setState(state)

        // TODO: move this to a plugin?
        if (transactions.some((tr) => tr.docChanged)) {
          transformer.export(state.doc, handleChange)
        }
      },
    })
  )

  useEffect(() => {
    if (state) {
      view.updateState(state)
    }
  }, [state, view])

  // TODO: setState if transformer or value change?
  // TODO: setState(state.reconfigure) if schema or plugins change?

  return { view, state }
}
