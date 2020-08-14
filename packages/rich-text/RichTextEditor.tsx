import { EditorContent, Floater, Toolbar, useProseMirror } from '@pompom/react'
import { HTMLTransformer } from '@pompom/transformers'
import { Node } from 'prosemirror-model'
import React, { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { plugins } from './plugins'
import { schema } from './schema'
import { floatingToolbarItems, toolbarItems } from './toolbars'

const transformer = new HTMLTransformer(schema)

export const RichTextEditor = React.memo<{
  autoFocus?: boolean
  debounce?: number
  handleChange: (value: string) => void
  value?: string
}>(({ autoFocus = false, debounce = 500, handleChange, value }) => {
  // TODO: handle value updates
  const [doc, setDoc] = useState(transformer.import(value))

  const [debouncedDoc] = useDebounce(doc, debounce, {
    maxWait: 5000,
  })

  useEffect(() => {
    handleChange(transformer.export(debouncedDoc))
  }, [debouncedDoc])

  const { view, state } = useProseMirror({
    schema,
    plugins,
    doc,
    setDoc,
  })

  if (!state) {
    return null
  }

  return (
    <div className={'pompom-container'}>
      <Toolbar items={toolbarItems} state={state} view={view} />

      <Floater state={state} view={view}>
        <Toolbar items={floatingToolbarItems} state={state} view={view} />
      </Floater>

      <EditorContent view={view} autoFocus={autoFocus} />
    </div>
  )
})
