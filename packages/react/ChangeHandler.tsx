import { ProsemirrorTransformer } from '@aeaton/prosemirror-transformers'
import { PropsWithChildren, ReactElement, useEffect } from 'react'

import { useEditorState } from './EditorProvider'
import { useDebounce } from './hooks'

export const ChangeHandler = <P extends unknown>({
  handleChange,
  transformer,
  debounce = 0,
}: PropsWithChildren<{
  handleChange: (value: P) => void
  transformer: ProsemirrorTransformer<P>
  debounce?: number
}>): ReactElement | null => {
  const state = useEditorState()

  const debouncedDoc = useDebounce(state.doc, debounce)

  useEffect(() => {
    handleChange(transformer.serialize(debouncedDoc))
  }, [handleChange, transformer, debouncedDoc])

  return null
}
