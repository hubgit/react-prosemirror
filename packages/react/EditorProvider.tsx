import { Extension, PomPom, Transformer } from '@pompom/core'
import { Node, Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface PomPomContext<
  T = any,
  N extends string = any,
  M extends string = any
> {
  pompom: PomPom<T, N, M>
  state: EditorState<Schema<N, M>>
}

const EditorContext = createContext<PomPomContext | undefined>(undefined)

export const usePomPom = <
  T,
  N extends string = never,
  M extends string = never
>(): {
  pompom: PomPom<T, N, M>
  state: EditorState<Schema<N, M>>
} => {
  const value = useContext<PomPomContext<T, N, M> | undefined>(EditorContext)

  if (!value) {
    throw new Error('Context is not available outside a provider!')
  }

  return value
}

export const EditorProvider = <
  T,
  N extends string = any,
  M extends string = any
>({
  children,
  debounce,
  extensions = [],
  handleChange,
  transformer,
  value,
}: PropsWithChildren<{
  debounce?: number
  extensions: Extension<N, M>[]
  handleChange?: (value: T) => void
  transformer: {
    new (schema: Schema<N, M>): Transformer<T, Schema<N, M>>
  }
  value?: T
}>): ReactElement | null => {
  const [state, setState] = useState<EditorState<Schema<N, M>>>()

  const pompom = useMemo(
    () =>
      new PomPom<T>({
        debounce,
        extensions,
        handleChange,
        handleStateChange: setState,
        transformer,
      }),
    [extensions, transformer, debounce, handleChange]
  )

  useEffect(() => {
    if (value !== undefined) {
      pompom.setValue(value)
    }
  }, [pompom, value])

  if (!pompom || !state) {
    return null
  }

  return (
    <div className={'pompom-container'}>
      <EditorContext.Provider value={{ pompom, state }}>
        {children}
      </EditorContext.Provider>
    </div>
  )
}
