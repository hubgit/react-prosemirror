import {
  Action,
  isBlockActive,
  isWrapped,
  removeFormatting,
  setBlockTypeAction,
  setListTypeOrWrapInList,
  toggleMarkAction,
  toggleWrap,
} from '@pompom/commands'
import { redo, undo } from 'prosemirror-history'
import { liftListItem, sinkListItem } from 'prosemirror-schema-list'

import { EditorSchema, schema } from './schema'

// TODO: define icons and keyboard shortcuts here?

export const toggleStrong = toggleMarkAction<EditorSchema>(schema.marks.strong)

export const toggleEmphasis = toggleMarkAction<EditorSchema>(schema.marks.em)

export const toggleCode = toggleMarkAction<EditorSchema>(schema.marks.code)

export const toggleSubscript = toggleMarkAction<EditorSchema>(
  schema.marks.subscript
)

export const toggleSuperscript = toggleMarkAction<EditorSchema>(
  schema.marks.superscript
)

export const toggleUnderline = toggleMarkAction<EditorSchema>(
  schema.marks.underline
)

export const toggleStrikethrough = toggleMarkAction<EditorSchema>(
  schema.marks.strikethrough
)

export const removeFormat: Action<EditorSchema> = {
  id: 'remove-format',
  label: 'Remove',
  title: 'Remove formatting',
  enable: removeFormatting,
  run: removeFormatting,
}

export const setNodeTypeParagraph = setBlockTypeAction<EditorSchema>(
  schema.nodes.paragraph
)

// export const setNodeTypeCodeBlock = setBlockTypeAction<EditorSchema>(
//   schema.nodes.codeBlock
// )

export const setNodeTypeHeading = setBlockTypeAction<EditorSchema>(
  schema.nodes.heading
)

export const toggleBlockquote: Action<EditorSchema> = {
  id: 'blockquote',
  label: 'Blockquote',
  title: 'Toggle block quote wrapper',
  active: isWrapped(schema.nodes.blockquote),
  enable: toggleWrap(schema.nodes.blockquote),
  run: toggleWrap(schema.nodes.blockquote),
}

export const wrapInOrderedList: Action<EditorSchema> = {
  id: 'ordered-list',
  label: 'Ordered list',
  title: 'Wrap in ordered list',
  active: isBlockActive(schema.nodes.list, { type: 'ordered' }),
  enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
  run: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
}

export const wrapInUnorderedList: Action<EditorSchema> = {
  id: 'unordered-list',
  label: 'Unordered list',
  title: 'Wrap in unordered list',
  active: isBlockActive(schema.nodes.list, { type: 'unordered' }),
  enable: setListTypeOrWrapInList(schema.nodes.list, {
    type: 'unordered',
  }),
  run: setListTypeOrWrapInList(schema.nodes.list, { type: 'unordered' }),
}

export const outdentListItem: Action<EditorSchema> = {
  id: 'outdent-list-item',
  label: 'Outdent',
  title: 'Outdent',
  enable: liftListItem(schema.nodes.listItem),
  run: liftListItem(schema.nodes.listItem),
}

export const indentListItem: Action<EditorSchema> = {
  id: 'indent-list-item',
  label: 'Indent',
  title: 'Indent',
  enable: sinkListItem(schema.nodes.listItem),
  run: sinkListItem(schema.nodes.listItem),
}

export const undoAction: Action<EditorSchema> = {
  id: 'undo',
  label: 'Undo',
  title: 'Undo last change',
  enable: undo,
  run: undo,
}

export const redoAction: Action<EditorSchema> = {
  id: 'redo',
  label: 'Redo',
  title: 'Redo last change',
  enable: redo,
  run: redo,
}
