import {
  Mark,
  MarkType,
  Node,
  NodeType,
  ResolvedPos,
  Schema,
} from 'prosemirror-model'
import {
  EditorState,
  NodeSelection,
  Selection,
  TextSelection,
} from 'prosemirror-state'
import { findWrapping, liftTarget } from 'prosemirror-transform'

import { DispatchTransaction } from '../types'

export const isMarkActive = <S extends Schema>(markType: MarkType<S>) => (
  state: EditorState<S>
): boolean => {
  const { from, $from, to, empty } = state.selection

  if (empty) {
    return Boolean(markType.isInSet(state.storedMarks || $from.marks()))
  }

  return state.doc.rangeHasMark(from, to, markType)
}

const isNodeSelection = (selection: Selection): selection is NodeSelection =>
  'node' in selection

export const isBlockActive = <S extends Schema>(
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

export const canInsertBlockAfter = <S extends Schema>(
  nodeType: NodeType<S>
) => (state: EditorState<S>): boolean => {
  const { $from } = state.selection

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, nodeType)) {
      return true
    }
  }

  return false
}

export const insertNodeAfter = <S extends Schema>(
  node: Node<S>,
  state: EditorState<S>,
  dispatch?: DispatchTransaction
): boolean => {
  const tr = state.tr

  const { $anchor } = state.selection

  const pos = $anchor.after()

  tr.insert(pos, node).setSelection(TextSelection.near(tr.doc.resolve(pos)))

  if (dispatch) {
    dispatch(tr)
  }

  return true
}

export const insertNodeTypeAfter = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>
) => (state: EditorState<S>, dispatch: DispatchTransaction): boolean => {
  const node = nodeType.createAndFill(attrs) as Node

  return insertNodeAfter(node, state, dispatch)
}

export const removeFormatting = <S extends Schema>(
  state: EditorState<S>,
  dispatch?: DispatchTransaction
): boolean => {
  const tr = state.tr

  const { from, to } = state.selection

  tr.removeMark(from, to, undefined).setStoredMarks()

  if (dispatch) {
    dispatch(tr)
  }

  return true
}

const parentBlockPos = <S extends Schema>(
  $pos: ResolvedPos
): number | undefined => {
  for (let depth = $pos.depth; depth > 0; depth--) {
    const parent = $pos.node(depth)

    if (parent.type.isBlock) {
      return $pos.before(depth)
    }
  }
}

const parentWithNodeTypePos = <S extends Schema>(
  $pos: ResolvedPos,
  nodeType: NodeType<S>
): number | undefined => {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const parent = $pos.node(depth)

    if (parent.type === nodeType) {
      return $pos.before(depth)
    }
  }
}

export const changeBlockType = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>,
  marks?: Array<Mark<S>>
) => (state: EditorState<S>, dispatch?: DispatchTransaction): boolean => {
  const tr = state.tr

  const { $from } = state.selection

  const parentPos = parentBlockPos($from)

  if (!parentPos) {
    return false
  }

  tr.setNodeMarkup(parentPos, nodeType, attrs, marks)

  if (dispatch) {
    dispatch(tr)
  }

  return true
}

export const toggleWrap = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>
) => (state: EditorState<S>, dispatch?: DispatchTransaction): boolean => {
  const tr = state.tr

  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  const parentPos = parentWithNodeTypePos(range.$from, nodeType)

  if (typeof parentPos === 'number') {
    const target = liftTarget(range)

    if (typeof target !== 'number') {
      return false
    }

    if (dispatch) {
      dispatch(tr.lift(range, target).scrollIntoView())
    }

    return true
  } else {
    const wrapping = findWrapping(range, nodeType, attrs)

    if (!wrapping) {
      return false
    }

    if (dispatch) {
      dispatch(tr.wrap(range, wrapping).scrollIntoView())
    }

    // return true
  }

  return false
}
