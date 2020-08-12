import { Extension, PomPom, Transformer } from '@pompom/core'
import { Schema } from 'prosemirror-model'
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

interface PomPomContext<N extends string = any, M extends string = any> {
  pompom: PomPom<N, M>
  state: EditorState<Schema<N, M>>
}

export const EditorContext = createContext<PomPomContext | undefined>(undefined)

export const usePomPom = <N extends string = any, M extends string = any>(): {
  pompom: PomPom<N, M>
  state: EditorState<Schema<N, M>>
} => {
  // @ts-ignore
  const { pompom, state } = useContext<PomPomContext<N, M>>(EditorContext)

  if (!pompom || !state) {
    throw new Error('Context not ready!')
  }

  return { pompom, state }
}

export const EditorProvider = <
  T,
  N extends string = any,
  M extends string = any
>({
  children,
  debounce = 500,
  handleChange,
  extensions = [],
  transformer,
  value,
}: PropsWithChildren<{
  debounce?: number
  extensions: Extension<N, M>[]
  handleChange: (value: T) => void
  transformer: Transformer<T, N, M>
  value?: T
}>): ReactElement => {
  const debouncedHandleChange = useMemo<
    (state: EditorState<Schema<N, M>>) => void
  >(() => {
    let timer: number

    return (state) => {
      if (timer) {
        window.clearTimeout(timer)
      }

      timer = window.setTimeout(() => {
        console.log(state.doc)
        // handleChange(transformer.export(state.doc))
      }, debounce)
    }
  }, [debounce, handleChange])

  const pompom = useMemo(
    () =>
      new PomPom(extensions, (state, transactions) => {
        setState(state)

        if (transactions && transactions.some((tr) => tr.docChanged)) {
          debouncedHandleChange(state)
        }
      }),
    [debouncedHandleChange, extensions]
  )

  const [state, setState] = useState(pompom.view.state)

  // useEffect(() => {
  //   pompom.updateState(transformer.import(value))
  // }, [pompom, transformer, value])

  return (
    <div className={'pompom-container'}>
      <EditorContext.Provider value={{ pompom, state }}>
        {children}
      </EditorContext.Provider>
    </div>
  )
}
