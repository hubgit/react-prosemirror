import {
  isBlockActive,
  isMarkActive,
  isWrapped,
  removeFormatting,
  setListTypeOrWrapInList,
  toggleWrap,
} from '@pompom/commands'
import { Command, setBlockType, toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { Schema } from 'prosemirror-model'
import { liftListItem, sinkListItem } from 'prosemirror-schema-list'
import { EditorState } from 'prosemirror-state'

import { EditorSchema, schema } from '../schema'

export interface Action<S extends Schema> {
  id: string
  label: string
  title: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
  run: Command<S>
}

// TODO: define icons and keyboard shortcuts here?

// TODO: nodeType as parameter?
export const toggleStrong: Action<EditorSchema> = {
  id: 'toggle-strong',
  label: 'Strong',
  title: 'Toggle strong',
  active: isMarkActive(schema.marks.strong),
  enable: toggleMark(schema.marks.strong),
  run: toggleMark(schema.marks.strong),
}

export const toggleEmphasis: Action<EditorSchema> = {
  id: 'toggle-emphasis',
  label: 'Emphasis',
  title: 'Toggle emphasis',
  active: isMarkActive(schema.marks.em),
  enable: toggleMark(schema.marks.em),
  run: toggleMark(schema.marks.em),
}

export const toggleCode: Action<EditorSchema> = {
  id: 'toggle-code',
  label: 'Code',
  title: 'Toggle code',
  active: isMarkActive(schema.marks.code),
  enable: toggleMark(schema.marks.code),
  run: toggleMark(schema.marks.code),
}

export const toggleSubscript: Action<EditorSchema> = {
  id: 'toggle-subscript',
  label: 'Subscript',
  title: 'Toggle subscript',
  active: isMarkActive(schema.marks.subscript),
  enable: toggleMark(schema.marks.subscript),
  run: toggleMark(schema.marks.subscript),
}

export const toggleSuperscript: Action<EditorSchema> = {
  id: 'toggle-superscript',
  label: 'Superscript',
  title: 'Toggle superscript',
  active: isMarkActive(schema.marks.superscript),
  enable: toggleMark(schema.marks.superscript),
  run: toggleMark(schema.marks.superscript),
}

export const toggleUnderline: Action<EditorSchema> = {
  id: 'toggle-underline',
  label: 'Underline',
  title: 'Toggle underline',
  active: isMarkActive(schema.marks.underline),
  enable: toggleMark(schema.marks.underline),
  run: toggleMark(schema.marks.underline),
}

export const toggleStrikethrough: Action<EditorSchema> = {
  id: 'toggle-strikethrough',
  label: 'Strikethrough',
  title: 'Toggle strikethrough',
  active: isMarkActive<EditorSchema>(schema.marks.strikethrough),
  enable: toggleMark<EditorSchema>(schema.marks.strikethrough),
  run: toggleMark<EditorSchema>(schema.marks.strikethrough),
}

export const removeFormat: Action<EditorSchema> = {
  id: 'remove-format',
  label: 'Remove',
  title: 'Remove formatting',
  enable: removeFormatting,
  run: removeFormatting,
}

export const setNodeTypeParagraph: Action<EditorSchema> = {
  id: 'set-paragraph',
  label: 'Paragraph',
  title: 'Change to paragraph',
  active: isBlockActive<EditorSchema>(schema.nodes.paragraph),
  enable: setBlockType<EditorSchema>(schema.nodes.paragraph),
  run: setBlockType<EditorSchema>(schema.nodes.paragraph),
}

export const setNodeTypeCodeBlock: Action<EditorSchema> = {
  id: 'set-code-block',
  label: 'Code block',
  title: 'Change to code block',
  active: isBlockActive<EditorSchema>(schema.nodes.code_block),
  enable: setBlockType<EditorSchema>(schema.nodes.code_block),
  run: setBlockType<EditorSchema>(schema.nodes.code_block),
}

export const setNodeTypeHeading: Action<EditorSchema> = {
  id: 'set-heading',
  label: 'Heading',
  title: 'Change to heading',
  active: isBlockActive(schema.nodes.heading),
  enable: setBlockType(schema.nodes.heading),
  run: setBlockType(schema.nodes.heading),
}

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
  enable: liftListItem(schema.nodes.list_item),
  run: liftListItem(schema.nodes.list_item),
}

export const indentListItem: Action<EditorSchema> = {
  id: 'indent-list-item',
  label: 'Indent',
  title: 'Indent',
  enable: sinkListItem(schema.nodes.list_item),
  run: sinkListItem(schema.nodes.list_item),
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
