import { Command } from 'prosemirror-commands'
import { NodeSpec, NodeType, Schema } from 'prosemirror-model'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { findWrapping } from 'prosemirror-transform'

import { parentInGroupPos } from '../commands'

export const listItem: NodeSpec = {
  content: '(paragraph | list)+', // 'paragraph (paragraph | list)+'
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
  toXML: () => ['list-item', 0],
}

export const orderedList: NodeSpec = {
  attrs: {
    start: { default: 1 },
  },
  group: 'block list',
  content: 'listItem+',
  parseDOM: [
    {
      tag: 'ol',
      // @ts-ignore
      getAttrs: (element: Element) => {
        const start = element.getAttribute('start')

        return {
          start: start !== undefined ? Number(start) : 1,
        }
      },
    },
  ],
  toDOM: () => ['ol', 0],
  toXML: () => ['list', { 'list-type': 'order' }, 0],
}

export const bulletList: NodeSpec = {
  group: 'block list',
  content: 'listItem+',
  parseDOM: [{ tag: 'ul' }],
  toDOM: () => ['ul', 0],
  toXML: () => ['list', { 'list-type': 'bullet' }, 0],
}

export const listKeymap = (listItemType: NodeType) => ({
  'Mod-]': sinkListItem(listItemType),
  'Mod-[': liftListItem(listItemType),
  Tab: sinkListItem(listItemType),
  'Shift-Tab': liftListItem(listItemType),
  Enter: splitListItem(listItemType),
  // TODO: backspace in list?
})

export const setListTypeOrWrapInList = <S extends Schema>(
  listType: NodeType<S>
): Command => (state, dispatch?) => {
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

    if (node && node.type === listType) {
      // return false if the node type already matches
      return false
    }

    if (dispatch) {
      dispatch(
        state.tr.setNodeMarkup(
          parentPos,
          listType,
          node ? node.attrs : undefined // TODO
        )
      )
    }

    return true
  } else {
    const wrapping = findWrapping(range, listType)

    if (!wrapping) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.wrap(range, wrapping).scrollIntoView())
    }

    return true
  }
}

// export const backspaceInList = <S extends Schema>(
//   listItemType: NodeType<S>
// ) => (state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => {
//   const { $from, $to } = state.selection
//
//   const range = $from.blockRange($to, (node) => {
//     if (!node.firstChild) {
//       return false
//     }
//
//     return node.firstChild!.type === listItemType
//   })
//
//   if (!range) {
//     return false
//   }
//
//   if (!dispatch) {
//     return true
//   }
//
//   // TODO: join text with preceding node if appropriate
//
//   return true // TODO
// }
