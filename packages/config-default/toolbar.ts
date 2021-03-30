import {
  isBlockActive,
  isMarkActive,
  isWrapped,
} from '@aeaton/prosemirror-commands'
import { ToolbarGroup } from '@aeaton/react-prosemirror'

import {
  liftListItemCommand,
  setBlockTypeCodeBlock,
  setBlockTypeHeading,
  setBlockTypeParagraph,
  setListTypeBullet,
  setListTypeOrdered,
  sinkListItemCommand,
  toggleLink,
  toggleMarkBold,
  toggleMarkCode,
  toggleMarkItalic,
  toggleMarkStrikethrough,
  toggleMarkSubscript,
  toggleMarkSuperscript,
  toggleMarkUnderline,
  toggleWrapBlockquote,
} from './commands'
import { icons } from './icons'
import { schema } from './schema'

export const toolbar: ToolbarGroup[] = [
  {
    id: 'marks',
    items: [
      {
        id: 'toggle-bold',
        content: icons.bold,
        action: toggleMarkBold,
        enable: toggleMarkBold,
        active: isMarkActive(schema.marks.bold),
      },
      {
        id: 'toggle-italic',
        title: 'Toggle italic',
        content: icons.italic,
        action: toggleMarkItalic,
        enable: toggleMarkItalic,
        active: isMarkActive(schema.marks.italic),
      },
      {
        id: 'toggle-code',
        title: 'Toggle code',
        content: icons.code,
        action: toggleMarkCode,
        enable: toggleMarkCode,
        active: isMarkActive(schema.marks.code),
      },
      {
        id: 'toggle-subscript',
        content: icons.subscript,
        action: toggleMarkSubscript,
        enable: toggleMarkSubscript,
        active: isMarkActive(schema.marks.subscript),
      },
      {
        id: 'toggle-superscript',
        content: icons.superscript,
        action: toggleMarkSuperscript,
        enable: toggleMarkSuperscript,
        active: isMarkActive(schema.marks.superscript),
      },
      {
        id: 'toggle-underline',
        content: icons.underline,
        action: toggleMarkUnderline,
        enable: toggleMarkUnderline,
        active: isMarkActive(schema.marks.underline),
      },
      {
        id: 'toggle-strikethrough',
        content: icons.strikethrough,
        action: toggleMarkStrikethrough,
        enable: toggleMarkStrikethrough,
        active: isMarkActive(schema.marks.strikethrough),
      },
    ],
  },
  {
    id: 'link',
    items: [
      {
        id: 'toggle-link',
        title: 'Add or remove link',
        content: icons.link,
        action: toggleLink,
        enable: (state) => !state.selection.empty,
        active: isMarkActive(schema.marks.link),
      },
    ],
  },
  {
    id: 'switch-blocks',
    items: [
      {
        id: 'block-paragraph',
        title: 'Change to paragraph',
        content: icons.paragraph,
        action: setBlockTypeParagraph,
        enable: setBlockTypeParagraph,
        active: isBlockActive(schema.nodes.paragraph),
      },
      {
        id: 'block-heading-1',
        title: 'Change to heading level 1',
        content: icons.heading,
        action: setBlockTypeHeading(1),
        enable: setBlockTypeHeading(1),
        active: isBlockActive(schema.nodes.heading, { level: 1 }),
      },
      {
        id: 'block-code-block',
        title: 'Change to code block',
        content: icons.codeBlock,
        action: setBlockTypeCodeBlock,
        enable: setBlockTypeCodeBlock,
        active: isBlockActive(schema.nodes.codeBlock),
      },
    ],
  },
  {
    id: 'toggle-blocks',
    items: [
      {
        id: 'block-blockquote',
        title: 'Toggle blockquote wrapper',
        content: icons.blockquote,
        action: toggleWrapBlockquote,
        enable: toggleWrapBlockquote,
        active: isWrapped(schema.nodes.blockquote),
      },
    ],
  },
  {
    id: 'lists',
    items: [
      {
        id: 'block-bullet-list',
        title: 'Wrap in bullet list',
        content: icons.bulletList,
        action: setListTypeBullet,
        enable: setListTypeBullet,
        active: isBlockActive(schema.nodes.list, { type: 'bullet' }),
      },
      {
        id: 'block-ordered-list',
        title: 'Wrap in ordered list',
        content: icons.orderedList,
        action: setListTypeOrdered,
        enable: setListTypeOrdered,
        active: isBlockActive(schema.nodes.list, { type: 'ordered' }),
      },
    ],
  },
  {
    id: 'indentation',
    items: [
      {
        id: 'outdent',
        title: 'Outdent',
        action: liftListItemCommand,
        enable: liftListItemCommand,
        content: icons.outdent,
      },
      {
        id: 'indent',
        title: 'Indent',
        action: sinkListItemCommand,
        enable: sinkListItemCommand,
        content: icons.indent,
      },
    ],
  },
]
