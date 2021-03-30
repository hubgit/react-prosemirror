import { Command } from 'prosemirror-commands'
import {
  MarkType,
  Node as ProsemirrorNode,
  NodeType,
  ResolvedPos,
} from 'prosemirror-model'
import { EditorState, NodeSelection, Selection } from 'prosemirror-state'
import { findWrapping, liftTarget } from 'prosemirror-transform'

export const insertNodeOfType = (nodeType: NodeType): Command => (
  state,
  dispatch
) => {
  const node = nodeType.create()
  if (dispatch) {
    dispatch(state.tr.replaceSelectionWith(node).scrollIntoView())
  }
  return true
}

export const isMarkActive = (markType: MarkType) => (
  state: EditorState
): boolean => {
  const { from, $from, to, empty } = state.selection

  if (empty) {
    return Boolean(markType.isInSet(state.storedMarks || $from.marks()))
  }

  return state.doc.rangeHasMark(from, to, markType)
}

const isNodeSelection = (selection: Selection): selection is NodeSelection =>
  'node' in selection

export const isBlockActive = (
  type: NodeType,
  attrs: Record<string, unknown> = {}
) => (state: EditorState): boolean => {
  if (isNodeSelection(state.selection)) {
    return state.selection.node.hasMarkup(type, attrs)
  }

  const { $from, to } = state.selection

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}

// export const removeFormatting: Command = (state, dispatch) => {
//   const { from, to } = state.selection
//
//   const tr = state.tr
//
//   tr.removeMark(from, to, undefined).setStoredMarks()
//
//   if (!tr.docChanged) {
//     return false
//   }
//
//   if (dispatch) {
//     dispatch(tr)
//   }
//
//   return true
// }

// export const canInsert = (type: NodeType) => (state: EditorState): boolean => {
//   const { $from } = state.selection
//
//   for (let d = $from.depth; d >= 0; d--) {
//     const index = $from.index(d)
//
//     if ($from.node(d).canReplaceWith(index, index, type)) {
//       return true
//     }
//   }
//
//   return false
// }

const parentWithNodeType = (
  $pos: ResolvedPos,
  nodeType: NodeType
): ProsemirrorNode | undefined => {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const parent = $pos.node(depth)

    if (parent.type === nodeType) {
      return parent
    }
  }
}

const parentWithNodeTypePos = (
  $pos: ResolvedPos,
  nodeType: NodeType
): number | undefined => {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const parent = $pos.node(depth)

    if (parent.type === nodeType) {
      return $pos.before(depth)
    }
  }
}

export const parentInGroupPos = (
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

export const isWrapped = (nodeType: NodeType) => (
  state: EditorState
): boolean => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  return parentWithNodeType(range.$from, nodeType) !== undefined
}

export const toggleWrap = (
  nodeType: NodeType,
  attrs?: Record<string, unknown>
): Command => (state, dispatch): boolean => {
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

export const setListTypeOrWrapInList = (
  listType: NodeType,
  attrs: { type: string }
): Command => (state, dispatch) => {
  const { $from, $to } = state.selection

  const range = $from.blockRange($to)

  if (!range) {
    return false
  }

  const parentPos = parentInGroupPos(range.$from, 'list')

  if (typeof parentPos === 'number') {
    // already in list
    const $pos = state.doc.resolve(parentPos)

    const node = $pos.nodeAfter

    if (node && node.type === listType && node.attrs.type === attrs.type) {
      // return false if the list type already matches
      return false
    }

    if (dispatch) {
      dispatch(
        state.tr.setNodeMarkup(
          parentPos,
          listType,
          node ? { ...node.attrs, ...attrs } : attrs
        )
      )
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

export const promptForURL = (): string | null => {
  let url = window && window.prompt('Enter the URL', 'https://')

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'https://' + url
  }

  return url
}
