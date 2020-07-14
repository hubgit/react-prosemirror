import { MarkType, Node, NodeType, Schema } from 'prosemirror-model'
import {
  EditorState,
  NodeSelection,
  Selection,
  TextSelection,
} from 'prosemirror-state'

import { DispatchTransaction } from '../types'

export const markActive = <S extends Schema>(markType: MarkType<S>) => (
  state: EditorState<S>
): boolean => {
  const { from, $from, to, empty } = state.selection

  if (empty) {
    return Boolean(markType.isInSet(state.storedMarks || $from.marks()))
  }

  return state.doc.rangeHasMark(from, to, markType)
}

export const canInsert = <S extends Schema>(nodeType: NodeType<S>) => (
  state: EditorState<S>
): boolean => {
  const { $from } = state.selection

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, nodeType)) {
      return true
    }
  }

  return false
}

const isNodeSelection = (selection: Selection): selection is NodeSelection =>
  'node' in selection

export const blockActive = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs = {}
) => (state: EditorState<S>): boolean => {
  if (isNodeSelection(state.selection)) {
    const { node } = state.selection

    if (node) {
      return node.hasMarkup(nodeType, attrs)
    }
  }

  const { $from, to } = state.selection

  return to <= $from.end() && $from.parent.hasMarkup(nodeType, attrs)
}

export const insertBlockAfter = <S extends Schema>(
  node: Node<S>,
  state: EditorState<S>,
  dispatch: DispatchTransaction
): void => {
  const tr = state.tr
  const pos = tr.selection.$anchor.after()
  tr.insert(pos, node)

  const selection = TextSelection.near(tr.doc.resolve(pos))
  tr.setSelection(selection)

  if (dispatch) {
    dispatch(tr)
  }
}

export const insertBlock = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>
) => (state: EditorState<S>, dispatch: DispatchTransaction): void => {
  const node = nodeType.createAndFill(attrs) as Node

  insertBlockAfter(node, state, dispatch)
}
