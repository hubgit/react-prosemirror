import { Action } from '@pompom/commands'
import { EditorConfig, Extension } from '@pompom/core'
import { BoldExtension } from '@pompom/extensions'
import {
  Editor,
  EditorContent,
  EditorContentProps,
  EditorFieldProps,
} from '@pompom/react'
import {
  MarkSpec,
  MarkType,
  NodeSpec,
  NodeType,
  Schema,
} from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React, { useMemo } from 'react'

import { createEventHandlers, EventHandlers } from '../config/dom-events'
import { transformer } from '../config/transformer'
import { FloatingToolbar } from './FloatingToolbar'
import { MainToolbar } from './MainToolbar'

const extensions: Extension[] = [new BoldExtension()]

// build schema
const marks: Record<string, MarkSpec> = {}
const nodes: Record<string, NodeSpec> = {}

for (const extension of extensions) {
  for (const [key, value] of Object.entries(extension.marks())) {
    marks[key] = value
  }

  for (const [key, value] of Object.entries(extension.nodes())) {
    nodes[key] = value
  }
}

type MarkName = keyof typeof marks
type NodeName = keyof typeof nodes

interface EditorSchema extends Schema {
  marks: Record<MarkName, MarkType>
  nodes: Record<NodeName, NodeType>
}

const schema: EditorSchema = new Schema({ marks, nodes })

// actions
const actions: Record<string, Action<EditorSchema>> = {}

for (const extension of extensions) {
  for (const [key, value] of Object.entries(extension.actions(schema))) {
    actions[key] = value
  }
}

// plugins
const plugins: Plugin<EditorSchema>[] = []

for (const extension of extensions) {
  for (const plugin of extension.plugins(schema, actions)) {
    plugins.push(plugin)
  }
}

export const RichText = React.memo<React.TextareaHTMLAttributes<'textarea'>>(
  ({ autoFocus = false, value, ...rest }) => {
    const config: EditorConfig<EditorSchema, string> = useMemo(() => {
      return {
        editorProps: {
          handleDOMEvents: createEventHandlers(rest as EventHandlers),
        },
        plugins,
        schema,
        transformer,
      }
    }, [rest])

    return (
      <Editor config={config} {...rest} value={String(value)}>
        <FloatingToolbar actions={actions} />
        <MainToolbar actions={actions} />
        <EditorContent autoFocus={autoFocus} />
      </Editor>
    )
  }
)
