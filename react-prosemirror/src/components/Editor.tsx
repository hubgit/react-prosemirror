import { Node, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Toolbar, ToolbarSpec, Transformer } from '..'

export const Editor = <S extends Schema, T = string>({
  autoFocus,
  debounce = 500,
  editorProps,
  handleChange,
  plugins,
  schema,
  toolbar,
  transformer,
  value,
}: {
  autoFocus?: boolean
  debounce?: number
  editorProps?: EditorProps<unknown, S>
  handleChange: (value: T) => void
  plugins: Plugin<S>[]
  schema: S
  toolbar: ToolbarSpec<S>
  transformer: Transformer<S, T>
  value: T
}): ReactElement | null => {
  const [editorState, setEditorState] = useState<EditorState<S>>()

  // debounce the output transformation if required
  const debouncedHandleChange = useMemo<(outputNode: Node<S>) => void>(() => {
    let timer: number

    return (outputNode) => {
      if (timer) {
        window.clearTimeout(timer)
      }

      window.setTimeout(() => {
        handleChange(transformer.export(outputNode))
      }, debounce)
    }
  }, [debounce, handleChange, transformer])

  // create the view
  const view = useMemo(() => {
    const view = new EditorView<S>(undefined, {
      state: EditorState.create<S>({ plugins, schema }),
      dispatchTransaction: (transaction) => {
        const { state, transactions } = view.state.applyTransaction(transaction)

        setEditorState(state)

        if (transactions.some((tr) => tr.docChanged)) {
          debouncedHandleChange(state.doc)
        }
      },
      ...editorProps,
    })

    setEditorState(view.state)

    return view
  }, [debouncedHandleChange, editorProps, plugins, schema])

  // update the state when the input value changes
  useEffect(() => {
    setEditorState(
      EditorState.create<S>({
        doc: transformer.import(value),
        plugins: view.state.plugins,
        schema: view.state.schema,
        // selection: view.state.selection,
      })
    )
  }, [transformer, value, view])

  // update the view when the state changes
  useEffect(() => {
    if (editorState) {
      view.updateState(editorState)
    }
  }, [editorState, view])

  // attach the view to the container when mounted
  const editorRef = useCallback(
    (container: HTMLDivElement | null) => {
      if (container) {
        container.appendChild(view.dom)

        if (autoFocus) {
          view.focus()
        }
      }
    },
    [view, autoFocus]
  )

  if (!editorState) {
    return null
  }

  return (
    <div ref={editorRef} className={'ProseMirror-container'}>
      <Toolbar<S> toolbar={toolbar} view={view} state={editorState} />
    </div>
  )
}
