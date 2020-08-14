import { blockActive, Extension, setListTypeOrWrapInList } from '@pompom/core'
import { wrappingInputRule } from 'prosemirror-inputrules'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'

export const list: Extension<'orderedList' | 'bulletList' | 'listItem'> = {
  nodes: {
    orderedList: {
      attrs: {
        start: { default: 1 },
      },
      group: 'block list',
      content: 'listItem+',
      parseDOM: [
        {
          tag: 'ol',
          getAttrs: (element: Element) => {
            const start = element.getAttribute('start')

            return {
              start: start === undefined ? Number(start) : 1,
            }
          },
        },
      ],
      toDOM: () => ['ol', 0],
      toXML: () => ['list', { 'list-type': 'order' }, 0],
    },
    bulletList: {
      group: 'block list',
      content: 'listItem+',
      parseDOM: [{ tag: 'ul' }],
      toDOM: () => ['ul', 0],
      toXML: () => ['list', { 'list-type': 'bullet' }, 0],
    },
    listItem: {
      content: '(paragraph | list)+', // 'paragraph (paragraph | list)+'
      parseDOM: [{ tag: 'li' }],
      toDOM: () => ['li', 0],
      toXML: () => ['list-item', 0],
    },
  },
  keys: (schema) => ({
    Enter: splitListItem(schema.nodes.listItem),
    'Mod-[': liftListItem(schema.nodes.listItem),
    'Mod-]': sinkListItem(schema.nodes.listItem), // Tab
  }),
  actions: (schema) => ({
    splitListItem: {
      enable: splitListItem(schema.nodes.listItem),
      run: splitListItem(schema.nodes.listItem),
    },
    liftListItem: {
      enable: liftListItem(schema.nodes.listItem),
      run: liftListItem(schema.nodes.listItem),
    },
    sinkListItem: {
      // active: blockActive(schema.nodes.list),
      enable: sinkListItem(schema.nodes.listItem),
      run: sinkListItem(schema.nodes.listItem),
    },
    // wrapInOrderedList: {
    //   active: blockActive(schema.nodes.list, { type: 'ordered' }),
    //   enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
    //   run: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
    // },
    wrapInOrderedList: {
      active: blockActive(schema.nodes.orderedList),
      enable: setListTypeOrWrapInList(schema.nodes.orderedList),
      run: setListTypeOrWrapInList(schema.nodes.orderedList),
    },
    // wrapInUnorderedList: {
    //   label: 'Unordered list',
    //   title: 'Wrap in unordered list',
    //   active: blockActive(schema.nodes.list, { type: 'unordered' }),
    //   enable: setListTypeOrWrapInList(schema.nodes.list, {
    //     type: 'unordered',
    //   }),
    //   run: setListTypeOrWrapInList(schema.nodes.list, { type: 'unordered' }),
    // },
    wrapInBulletList: {
      active: blockActive(schema.nodes.bulletList),
      enable: setListTypeOrWrapInList(schema.nodes.bulletList),
      run: setListTypeOrWrapInList(schema.nodes.bulletList),
    },
  }),
  inputRules: (schema) => ({
    bulletListRule: wrappingInputRule(
      /^\s*([-+*])\s$/,
      schema.nodes.bulletList
    ),
    orderedListRule: wrappingInputRule(
      /^(\d+)\.\s$/,
      schema.nodes.orderedList,
      (match) => ({ start: +match[1] }),
      (match, node) => node.childCount + node.attrs.start === +match[1]
    ),
  }),
}
