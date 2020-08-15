import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useEffect, useState } from 'react'

const EditorContext = createContext<
  { view: EditorView; state: EditorState } | undefined
>(undefined)

export const useEditorContext = () => {
  const editor = useContext(EditorContext)

  if (!editor) {
    throw new Error('Editor context is only available inside EditorProvider')
  }

  return editor
}

export const EditorProvider: React.FC<{
  view: EditorView
  state: EditorState
}> = ({ children, view, state }) => {
  // TODO: subscribe to state here instead
  // const [state, setState] = useState<EditorState>()

  // useEffect(() => {
  //   pompom.onStateChange(setState)
  // }, [])

  return (
    <EditorContext.Provider value={{ view, state }}>
      <div className={'pompom-container'}>{children}</div>
    </EditorContext.Provider>
  )
}
