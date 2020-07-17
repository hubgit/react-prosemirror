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
  Transaction,
} from 'prosemirror-state'
import { findWrapping, liftTarget } from 'prosemirror-transform'

type DispatchTransaction = (transaction: Transaction) => void

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
  const { $anchor } = state.selection

  const pos = $anchor.after()

  if (dispatch) {
    const tr = state.tr

    tr.insert(pos, node).setSelection(TextSelection.near(tr.doc.resolve(pos)))

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
  const { from, to } = state.selection

  const tr = state.tr

  tr.removeMark(from, to, undefined).setStoredMarks()

  if (!tr.docChanged) {
    return false
  }

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

const parentWithNodeType = <S extends Schema>(
  $pos: ResolvedPos<S>,
  nodeType: NodeType<S>
): Node<S> | undefined => {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const parent = $pos.node(depth)

    if (parent.type === nodeType) {
      return parent
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
  const { $from } = state.selection

  const parentPos = parentBlockPos($from)

  if (!parentPos) {
    return false
  }

  if (dispatch) {
    dispatch(state.tr.setNodeMarkup(parentPos, nodeType, attrs, marks))
  }

  return true
}

export const canWrap = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>
) => (state: EditorState<S>): boolean => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  if (parentWithNodeType(range.$from, nodeType)) {
    return false // already wrapped
  }

  return findWrapping(range, nodeType, attrs) !== null
}

export const isWrapped = <S extends Schema>(nodeType: NodeType<S>) => (
  state: EditorState<S>
): boolean => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  return parentWithNodeType(range.$from, nodeType) !== undefined
}

export const toggleWrap = <S extends Schema>(
  nodeType: NodeType<S>,
  attrs?: Record<string, unknown>
) => (state: EditorState<S>, dispatch?: DispatchTransaction): boolean => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  const parentPos = parentWithNodeTypePos(range.$from, nodeType)

  if (typeof parentPos === 'number') {
    // unwrap
    const target = liftTarget(range)

    if (typeof target !== 'number') {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.lift(range, target).scrollIntoView())
    }

    return true
  } else {
    // wrap
    const wrapping = findWrapping(range, nodeType, attrs)

    if (!wrapping) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.wrap(range, wrapping).scrollIntoView())
    }

    return true
  }
}

export const setListTypeOrWrapInList = <S extends Schema>(
  listType: NodeType<S>,
  attrs: Record<string, unknown>
) => (state: EditorState, dispatch?: DispatchTransaction) => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  const parentPos = parentWithNodeTypePos(range.$from, listType)

  if (typeof parentPos === 'number') {
    // already in list
    const $pos = state.doc.resolve(parentPos)

    const node = $pos.nodeAfter

    if (node && node.attrs.type === attrs.type) {
      // return false if the node type already matches
      return false
    }

    if (dispatch) {
      dispatch(state.tr.setNodeMarkup(parentPos, undefined, attrs))
    }

    return true
  } else {
    const wrapping = findWrapping(range, listType, attrs)

    if (!wrapping) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.wrap(range, wrapping).scrollIntoView())
    }

    return true
  }
}
