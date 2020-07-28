import { Command, setBlockType, toggleMark } from 'prosemirror-commands'
import { MarkType, NodeType, Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'

import { isBlockActive, isMarkActive } from './commands'

export interface Action<S extends Schema> {
  id: string
  label: string
  title: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
  run: Command<S>
}

export const toggleMarkAction = <S extends Schema>(
  markType: MarkType<S>
): Action<S> => ({
  label: markType.name,
  id: `toggle-mark-${markType.name}`,
  title: `Toggle ${markType.name}`,
  active: isMarkActive<S>(markType),
  enable: toggleMark<S>(markType),
  run: toggleMark<S>(markType),
})

export const setBlockTypeAction = <S extends Schema>(
  nodeType: NodeType<S>
): Action<S> => ({
  label: nodeType.name,
  id: `set-block-${nodeType.name}`,
  title: `Change to ${nodeType.name}`,
  active: isBlockActive<S>(nodeType),
  enable: setBlockType<S>(nodeType),
  run: setBlockType<S>(nodeType),
})
