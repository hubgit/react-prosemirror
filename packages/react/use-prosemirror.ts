import { Node, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useMemo, useState } from 'react'

export const useProseMirror = <S extends Schema>({
  schema,
  plugins,
  doc,
  setDoc,
}: {
  schema: S
  plugins: Plugin<S>[]
  doc?: Node<S>
  setDoc: (node: Node<S>) => void
}) => {
  const [state, setState] = useState<EditorState>()

  const view = useMemo(
    () =>
      new EditorView(undefined, {
        state: EditorState.create({ schema }),
        dispatchTransaction: function (tr) {
          const { state, transactions } = this.state.applyTransaction(tr)

          setState(state)

          // TODO: move this to a plugin?
          if (transactions.some((tr) => tr.docChanged)) {
            setDoc(state.doc)
          }
        },
      }),
    [setDoc]
  )

  useEffect(() => {
    if (plugins) {
      setState(
        EditorState.create({
          ...view.state,
          plugins,
        })
      )
    }
  }, [plugins, view])

  // TODO: is this appropriate? only if changed?
  useEffect(() => {
    if (doc) {
      setState(
        EditorState.create({
          ...view.state,
          doc,
        })
      )
    }
  }, [doc, view])

  useEffect(() => {
    if (state) {
      view.updateState(state)
    }
  }, [state, view])

  return { view, state }
}
