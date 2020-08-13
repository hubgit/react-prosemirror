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
  actions: (schema) => ({
    splitListItem: {
      label: 'Split',
      title: 'Split list item',
      key: 'Enter',
      run: splitListItem(schema.nodes.listItem),
    },
    liftListItem: {
      label: 'Outdent',
      title: 'Outdent list item',
      key: 'Mod-[', // 'Shift-Tab'
      run: liftListItem(schema.nodes.listItem),
    },
    sinkListItem: {
      label: 'Indent',
      title: 'Indent list item',
      key: 'Mod-]', // 'Tab'
      run: sinkListItem(schema.nodes.listItem),
    },
    // wrapInOrderedList: {
    //   label: 'Ordered list',
    //   title: 'Wrap in ordered list',
    //   active: blockActive(schema.nodes.list, { type: 'ordered' }),
    //   enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
    //   run: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
    // },
    wrapInOrderedList: {
      label: 'Ordered list',
      title: 'Wrap in ordered list',
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
      label: 'Bullet list',
      title: 'Wrap in bullet list',
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
