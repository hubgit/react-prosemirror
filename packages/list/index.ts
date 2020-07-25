import { keymap } from 'prosemirror-keymap'
import { NodeSpec, NodeType } from 'prosemirror-model'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'

interface ListAttrs {
  start?: number
  type: string
}

const list: NodeSpec = {
  attrs: {
    start: { default: 1 },
    type: { default: 'unordered' },
  },
  content: 'list_item+',
  group: 'block',
  parseDOM: [
    {
      tag: 'ol',
      getAttrs: (dom: Node | string): ListAttrs => {
        const element = dom as HTMLOListElement

        const start = element.getAttribute('start')

        return {
          type: 'ordered',
          start: start === undefined ? 1 : Number(start),
        }
      },
    },
    {
      tag: 'ul',
      getAttrs: (): ListAttrs => {
        return {
          type: 'unordered',
        }
      },
    },
  ],
  toDOM: (node) => {
    switch (node.attrs.type) {
      case 'ordered': {
        return node.attrs.order == 1
          ? ['ol', 0]
          : ['ol', { start: node.attrs.order }, 0]
      }

      case 'unordered':
      default: {
        return ['ul', 0]
      }
    }
  },
}

const list_item: NodeSpec = {
  content: 'paragraph (paragraph | list)*',
  defining: true,
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
}

export const nodes = { list, list_item }

// export const commands = { splitListItem, liftListItem, sinkListItem }

export const plugins = (listItemType: NodeType): Plugin[] => [
  keymap({
    Enter: splitListItem(listItemType),
    'Shift-Tab': liftListItem(listItemType),
    Tab: sinkListItem(listItemType),
    Backspace: (state: EditorState, dispatch?: (tr: Transaction) => void) => {
      const { $from, $to } = state.selection

      const range = $from.blockRange($to, (node) => {
        if (!node.firstChild) {
          return false
        }

        return node.firstChild!.type === listItemType
      })

      if (!range) {
        return false
      }

      if (!dispatch) {
        return true
      }

      // TODO: join text with preceding node if appropriate

      return true // TODO
    },
  }),
]
