import { Node } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useMemo, useState } from 'react'

const EditorContext = createContext<
  | {
      state: EditorState
      view: EditorView
    }
  | undefined
>(undefined)

export const useEditorContext = () => {
  const editor = useContext(EditorContext)

  if (!editor) {
    throw new Error('Editor context is only available inside EditorProvider')
  }

  return editor
}

export const EditorProvider: React.FC<{
  doc: Node
  handleDocChange: (node: Node) => void
  plugins: Plugin[]
}> = ({ children, doc, handleDocChange, plugins }) => {
  const [state, setState] = useState(EditorState.create({ doc, plugins }))

  const view = useMemo(
    () =>
      new EditorView(undefined, {
        state,
        dispatchTransaction: (tr) => {
          const { state, transactions } = view.state.applyTransaction(tr)

          setState(state)

          view.updateState(state)

          if (transactions.some((tr) => tr.docChanged)) {
            handleDocChange(state.doc)
          }
        },
      }),
    [handleDocChange]
  )

  return (
    <EditorContext.Provider value={{ state, view }}>
      <div className={'pompom-container'}>{children}</div>
    </EditorContext.Provider>
  )
}
