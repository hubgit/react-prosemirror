import { HTMLTransformer } from '@pompom/html-transformer'
import { EditorContent, Floater, Toolbar, useProseMirror } from '@pompom/react'
import { EditorProvider } from '@pompom/react/EditorProvider'
import React, { useMemo } from 'react'

import { createPlugins } from './plugins'
import { EditorSchema, schema } from './schema'
import { floatingToolbarItems, toolbarItems } from './toolbars'
// TODO: nodeViews/editorProps

const plugins = createPlugins<EditorSchema>(schema)

export const RichTextEditor = React.memo<{
  autoFocus?: boolean
  debounce?: number
  handleChange: (value: string) => void
  value?: string
}>(({ autoFocus = false, debounce = 500, value = '', handleChange }) => {
  // TODO: handle debouncing elsewhere
  const transformer = useMemo(() => new HTMLTransformer(schema, debounce), [
    debounce,
  ])

  const { view, state } = useProseMirror<string, typeof schema>({
    schema,
    plugins,
    value,
    transformer,
    handleChange,
  })

  // const pompom = createEditor({
  //   schema,
  //   plugins,
  //   value,
  //   transformer,
  //   handleChange,
  // })

  if (!state) {
    return null
  }

  return (
    <EditorProvider view={view} state={state}>
      <Toolbar items={toolbarItems} />

      <Floater>
        <Toolbar items={floatingToolbarItems} />
      </Floater>

      <EditorContent autoFocus={autoFocus} />
    </EditorProvider>
  )
})
