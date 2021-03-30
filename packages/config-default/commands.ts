import {
  insertNodeOfType,
  isMarkActive,
  promptForURL,
  setListTypeOrWrapInList,
  toggleWrap,
} from '@aeaton/prosemirror-commands'
import { Command, setBlockType, toggleMark, wrapIn } from 'prosemirror-commands'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'

import { schema } from './schema'

// marks

export const toggleMarkBold = toggleMark(schema.marks.bold)
export const toggleMarkItalic = toggleMark(schema.marks.italic)
export const toggleMarkCode = toggleMark(schema.marks.code)
export const toggleMarkSubscript = toggleMark(schema.marks.subscript)
export const toggleMarkSuperscript = toggleMark(schema.marks.superscript)
export const toggleMarkUnderline = toggleMark(schema.marks.underline)
export const toggleMarkStrikethrough = toggleMark(schema.marks.strikethrough)

export const toggleLink: Command = (state, dispatch) => {
  if (isMarkActive(schema.marks.link)(state)) {
    toggleMark(schema.marks.link)(state, dispatch)
    return true
  }

  const href = promptForURL()

  if (!href) {
    return false
  }

  toggleMark(schema.marks.link, { href })(state, dispatch)
  // view.focus()
  return true
}

// nodes

export const setBlockTypeParagraph = setBlockType(schema.nodes.paragraph)
export const setBlockTypeCodeBlock = setBlockType(schema.nodes.codeBlock)

export const setBlockTypeHeading = (level: number): Command =>
  setBlockType(schema.nodes.heading, { level })

export const toggleWrapBlockquote = toggleWrap(schema.nodes.blockquote)
export const wrapInBlockquote = wrapIn(schema.nodes.blockquote)

export const setListTypeBullet = setListTypeOrWrapInList(schema.nodes.list, {
  type: 'bullet',
})
export const setListTypeOrdered = setListTypeOrWrapInList(schema.nodes.list, {
  type: 'ordered',
})

export const liftListItemCommand = liftListItem(schema.nodes.listItem)
export const sinkListItemCommand = sinkListItem(schema.nodes.listItem) // TODO: same list type
export const splitListItemCommand = splitListItem(schema.nodes.listItem)

export const insertNodeLineBreak = insertNodeOfType(schema.nodes.lineBreak)
export const insertNodeHorizontalRule = insertNodeOfType(
  schema.nodes.horizontalRule
)
