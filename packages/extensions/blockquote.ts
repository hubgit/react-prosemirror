import { Extension, isWrapped, toggleWrap } from '@pompom/core'
// import { wrapIn } from 'prosemirror-commands'
import { wrappingInputRule } from 'prosemirror-inputrules'

export const blockquote: Extension = {
  nodes: {
    blockquote: {
      attrs: {
        cite: { default: undefined },
      },
      group: 'block',
      content: 'paragraph+', // 'block+'
      parseDOM: [
        {
          tag: 'blockquote',
          getAttrs: (element: Element) => ({
            cite: element.getAttribute('cite') || undefined,
          }),
        },
      ],
      toDOM: () => ['blockquote', 0],
      toXML: () => ['disp-quote', 0],
    },
  },
  actions: (schema) => ({
    // wrapInBlockquote: {
    //   label: 'Block Quote',
    //   title: 'Toggle Block Quote',
    //   run: wrapIn(schema.nodes.blockquote), // TODO: unwrap
    //   enable: wrapIn(schema.nodes.blockquote),
    //   // active: blockActive(schema.nodes.blockquote), // TODO
    // },
    toggleBlockquote: {
      label: 'Blockquote',
      title: 'Toggle block quote wrapper',
      active: isWrapped(schema.nodes.blockquote),
      enable: toggleWrap(schema.nodes.blockquote),
      run: toggleWrap(schema.nodes.blockquote),
    },
  }),
  inputRules: (schema) => ({
    blockQuoteRule: wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
  }),
}
