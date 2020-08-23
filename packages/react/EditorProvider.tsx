import { Node } from 'prosemirror-model'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'
import React, { createContext, useCallback, useContext, useState } from 'react'

const EditorContext = createContext<
  | { state: EditorState; dispatch: (transaction: Transaction) => void }
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

  const dispatch = useCallback(
    (transaction: Transaction) => {
      setState((state) => {
        const { state: newState, transactions } = state.applyTransaction(
          transaction
        )

        if (transactions.some((tr) => tr.docChanged)) {
          handleDocChange(newState.doc)
        }

        return newState
      })
    },
    [handleDocChange]
  )

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <div className={'pompom-container'}>{children}</div>
    </EditorContext.Provider>
  )
}
