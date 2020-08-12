import { blockActive, Extension } from '@pompom/core'
import { setBlockType } from 'prosemirror-commands'
import { textblockTypeInputRule } from 'prosemirror-inputrules'

export const heading: Extension<'heading'> = {
  nodes: {
    heading: {
      attrs: {
        level: { default: 1 },
      },
      group: 'heading',
      content: 'inline*', // 'text*'
      marks: 'emphasis superscript subscript',
      defining: true,
      parseDOM: [
        { tag: 'h1', getAttrs: () => ({ level: 1 }) },
        { tag: 'h2', getAttrs: () => ({ level: 2 }) },
        { tag: 'h3', getAttrs: () => ({ level: 3 }) },
        { tag: 'h4', getAttrs: () => ({ level: 4 }) },
        { tag: 'h5', getAttrs: () => ({ level: 5 }) },
        { tag: 'h6', getAttrs: () => ({ level: 6 }) },
      ],
      toDOM: (node) => ['h' + node.attrs.level, 0],
      toXML: () => ['title', 0], // TODO: wrap in section
    },
  },
  actions: ({ schema }) => ({
    setNodeTypeHeading: {
      label: 'Heading',
      title: 'Change to heading',
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 }),
    },
  }),
  inputRules: ({ schema }) => ({
    headingRule: textblockTypeInputRule(
      new RegExp('^(#{1,6})\\s$'),
      schema.nodes.heading,
      (match) => ({ level: match[1].length })
    ),
  }),
}
