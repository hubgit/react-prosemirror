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
  // TextSelection,
  Transaction,
} from 'prosemirror-state'
import { findWrapping, liftTarget } from 'prosemirror-transform'

export type DispatchTransaction = (transaction: Transaction) => void

export const markActive = <S extends Schema>(markType: MarkType<S>) => (
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

// const parentBlockPos = <S extends Schema>(
//   $pos: ResolvedPos
// ): number | undefined => {
//   for (let depth = $pos.depth; depth > 0; depth--) {
//     const parent = $pos.node(depth)
//
//     if (parent.type.isBlock) {
//       return $pos.before(depth)
//     }
//   }
// }

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

export const parentInGroupPos = <S extends Schema>(
  $pos: ResolvedPos,
  nodeTypeGroup: string
): number | undefined => {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const parent = $pos.node(depth)
    const { group } = parent.type.spec

    if (group && group.split(/\s+/).includes(nodeTypeGroup)) {
      return $pos.before(depth)
    }
  }
}

//
// export const changeBlockType = <S extends Schema>(
//   nodeType: NodeType<S>,
//   attrs?: Record<string, unknown>,
//   marks?: Array<Mark<S>>
// ) => (state: EditorState<S>, dispatch?: DispatchTransaction): boolean => {
//   const { $from } = state.selection
//
//   const parentPos = parentBlockPos($from)
//
//   if (!parentPos) {
//     return false
//   }
//
//   if (dispatch) {
//     dispatch(state.tr.setNodeMarkup(parentPos, nodeType, attrs, marks))
//   }
//
//   return true
// }
//
// export const canWrap = <S extends Schema>(
//   nodeType: NodeType<S>,
//   attrs?: Record<string, unknown>
// ) => (state: EditorState<S>): boolean => {
//   const { $from, $to } = state.selection
//
//   const range = $from.blockRange($to)
//
//   if (!range) {
//     return false
//   }
//
//   if (parentWithNodeType(range.$from, nodeType)) {
//     return false // already wrapped
//   }
//
//   return findWrapping(range, nodeType, attrs) !== null
// }

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
