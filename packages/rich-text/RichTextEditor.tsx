import { HTMLTransformer } from '@pompom/html-transformer'
import { EditorContent, Floater, Toolbar, useProseMirror } from '@pompom/react'
import React, { useMemo } from 'react'

import { createPlugins } from './plugins'
import { EditorSchema, schema } from './schema'
import { floatingToolbarItems, toolbarItems } from './toolbars'
// TODO: nodeViews/editorProps

export const RichTextEditor = React.memo<{
  autoFocus?: boolean
  debounce?: number
  handleChange: (value: string) => void
  value?: string
}>(({ autoFocus = false, debounce = 500, value = '', handleChange }) => {
  const transformer = useMemo(() => new HTMLTransformer(schema, debounce), [
    debounce,
  ])

  const plugins = useMemo(() => createPlugins<EditorSchema>(schema), [])

  const { view, state } = useProseMirror<string, typeof schema>({
    schema,
    plugins,
    value,
    transformer,
    handleChange,
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
