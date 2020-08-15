import { PomPom } from '@pompom/core'
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
  pompom: PomPom
}> = ({ children, pompom }) => {
  const [state, setState] = useState<EditorState>(pompom.view.state)

  useEffect(() => {
    const handler = (event: Event) => {
      setState((event as CustomEvent<EditorState>).detail)
    }

    pompom.addEventListener('statechange', handler)

    return () => {
      pompom.removeEventListener('statechange', handler)
    }
  }, [pompom])

  return (
    <EditorContext.Provider value={{ view: pompom.view, state }}>
      <div className={'pompom-container'}>{children}</div>
    </EditorContext.Provider>
  )
}
