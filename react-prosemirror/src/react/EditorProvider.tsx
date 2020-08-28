import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { Editor } from '../Editor'

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
  editor: Editor
}> = ({ children, editor }) => {
  const [state, setState] = useState<EditorState>(editor.view.state)

  useEffect(() => {
    const handler = (event: Event) => {
      setState((event as CustomEvent<EditorState>).detail)
    }

    editor.addEventListener('statechange', handler)

    return () => {
      editor.removeEventListener('statechange', handler)
    }
  }, [editor])

  return (
    <EditorContext.Provider value={{ view: editor.view, state }}>
      <div className={'pompom-container'}>{children}</div>
    </EditorContext.Provider>
  )
}
