import { CodeBlockView } from '@pompom/code-block'
import { EditorConfigCreator } from '@pompom/core'

import { plugins } from './plugins'
import { EditorSchema, schema } from './schema'
import { transformer } from './transformer'

export interface EditorConfigProps {
  onBlur?: (event: Event) => void
  onFocus?: (event: Event) => void
}

export const createConfig: EditorConfigCreator<
  EditorConfigProps,
  EditorSchema,
  string
> = ({ onBlur, onFocus }) => {
  return {
    editorProps: {
      handleDOMEvents: {
        blur: (view, event) => {
          onBlur && onBlur(event)
          return false
        },
        focus: (view, event) => {
          onFocus && onFocus(event)
          return false
        },
      },
      nodeViews: {
        codeBlock: (node, view, getPos) =>
          // @ts-ignore (getPos)
          new CodeBlockView(node, view, getPos),
      },
      scrollMargin: 16,
      scrollThreshold: 16,
    },
    plugins,
    schema,
    transformer,
  }
}
