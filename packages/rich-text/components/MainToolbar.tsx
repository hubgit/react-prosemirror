// https://fontawesome.com/icons?c=editors
import {
  faBold,
  faCode,
  faHeading,
  faIndent,
  faItalic,
  faListOl,
  faListUl,
  faOutdent,
  faParagraph,
  faQuoteLeft,
  faRedo,
  faRemoveFormat,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  isBlockActive,
  isMarkActive,
  isWrapped,
  removeFormatting,
  setListTypeOrWrapInList,
  toggleWrap,
} from '@pompom/commands'
import * as history from '@pompom/history'
import { Toolbar, ToolbarGroup, ToolbarItem } from '@pompom/react'
import { setBlockType, toggleMark } from 'prosemirror-commands'
import { liftListItem, sinkListItem } from 'prosemirror-schema-list'
import React from 'react'

import { EditorSchema, schema } from '../schema'

const menu = [
  {
    id: 'format',
    label: 'Format',
    items: [
      {
        id: 'strong',
        label: 'Strong',
        title: 'Toggle strong',
        icon: <FontAwesomeIcon icon={faBold} />,
        active: isMarkActive(schema.marks.strong),
        enable: toggleMark(schema.marks.strong),
        run: toggleMark(schema.marks.strong),
      },
      {
        id: 'emphasis',
        label: 'Emphasis',
        title: 'Toggle emphasis',
        icon: <FontAwesomeIcon icon={faItalic} />,
        active: isMarkActive(schema.marks.em),
        enable: toggleMark(schema.marks.em),
        run: toggleMark(schema.marks.em),
      },
      {
        id: 'code',
        label: 'Code',
        title: 'Toggle code',
        icon: <FontAwesomeIcon icon={faCode} />,
        active: isMarkActive(schema.marks.code),
        enable: toggleMark(schema.marks.code),
        run: toggleMark(schema.marks.code),
      },
      {
        id: 'subscript',
        label: 'Subscript',
        title: 'Toggle subscript',
        icon: <FontAwesomeIcon icon={faSubscript} />,
        active: isMarkActive(schema.marks.subscript),
        enable: toggleMark(schema.marks.subscript),
        run: toggleMark(schema.marks.subscript),
      },
      {
        id: 'superscript',
        label: 'Superscript',
        title: 'Toggle superscript',
        icon: <FontAwesomeIcon icon={faSuperscript} />,
        active: isMarkActive(schema.marks.superscript),
        enable: toggleMark(schema.marks.superscript),
        run: toggleMark(schema.marks.superscript),
      },
      {
        id: 'underline',
        label: 'Underline',
        title: 'Toggle underline',
        icon: <FontAwesomeIcon icon={faUnderline} />,
        active: isMarkActive(schema.marks.underline),
        enable: toggleMark(schema.marks.underline),
        run: toggleMark(schema.marks.underline),
      },
      {
        id: 'strikethrough',
        label: 'Strikethrough',
        title: 'Toggle strikethrough',
        icon: <FontAwesomeIcon icon={faStrikethrough} />,
        active: isMarkActive(schema.marks.strikethrough),
        enable: toggleMark(schema.marks.strikethrough),
        run: toggleMark(schema.marks.strikethrough),
      },
      {
        id: 'remove-format',
        label: 'Remove',
        title: 'Remove formatting',
        icon: <FontAwesomeIcon icon={faRemoveFormat} />,
        enable: removeFormatting,
        run: removeFormatting,
      },
    ],
  },
  {
    id: 'block',
    label: 'Block Type',
    items: [
      {
        id: 'paragraph',
        label: 'Paragraph',
        title: 'Change to paragraph',
        icon: <FontAwesomeIcon icon={faParagraph} />,
        active: isBlockActive(schema.nodes.paragraph),
        enable: setBlockType(schema.nodes.paragraph),
        run: setBlockType(schema.nodes.paragraph),
      },
      {
        id: 'code-block',
        label: 'Code block',
        title: 'Change to code block',
        icon: <FontAwesomeIcon icon={faCode} />,
        active: isBlockActive(schema.nodes.code_block),
        enable: setBlockType(schema.nodes.code_block),
        run: setBlockType(schema.nodes.code_block),
      },
      {
        id: 'heading',
        label: 'Heading',
        title: 'Change to heading',
        icon: <FontAwesomeIcon icon={faHeading} />,
        active: isBlockActive(schema.nodes.heading, { level: 1 }),
        enable: setBlockType(schema.nodes.heading, { level: 1 }),
        run: setBlockType(schema.nodes.heading, { level: 1 }),
      },
    ],
  },
  {
    id: 'quote',
    label: 'Quote',
    items: [
      {
        id: 'blockquote',
        label: 'Blockquote',
        title: 'Toggle block quote wrapper',
        icon: <FontAwesomeIcon icon={faQuoteLeft} />,
        active: isWrapped(schema.nodes.blockquote),
        enable: toggleWrap(schema.nodes.blockquote),
        run: toggleWrap(schema.nodes.blockquote),
      },
    ],
  },
  {
    id: 'wrap',
    label: 'Wrap',
    items: [
      {
        id: 'ordered-list',
        label: 'Ordered list',
        title: 'Wrap in ordered list',
        icon: <FontAwesomeIcon icon={faListOl} />,

        active: isBlockActive(schema.nodes.list, { type: 'ordered' }),
        enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
        run: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
      },
      {
        id: 'unordered-list',
        label: 'Unordered list',
        title: 'Wrap in unordered list',
        icon: <FontAwesomeIcon icon={faListUl} />,
        active: isBlockActive(schema.nodes.list, { type: 'unordered' }),
        enable: setListTypeOrWrapInList(schema.nodes.list, {
          type: 'unordered',
        }),
        run: setListTypeOrWrapInList(schema.nodes.list, { type: 'unordered' }),
      },
      {
        id: 'lift',
        label: 'Outdent',
        title: 'Outdent',
        icon: <FontAwesomeIcon icon={faOutdent} />,
        enable: liftListItem(schema.nodes.list_item),
        run: liftListItem(schema.nodes.list_item),
      },
      {
        id: 'sink',
        label: 'Indent',
        title: 'Indent',
        icon: <FontAwesomeIcon icon={faIndent} />,
        enable: sinkListItem(schema.nodes.list_item),
        run: sinkListItem(schema.nodes.list_item),
      },
    ],
  },
  {
    id: 'history',
    label: 'History',
    items: [
      {
        id: 'undo',
        label: 'Undo',
        title: 'Undo last change',
        icon: <FontAwesomeIcon icon={faUndo} />,
        enable: history.commands.undo,
        run: history.commands.undo,
      },

      {
        id: 'redo',
        label: 'Redo',
        title: 'Redo last change',
        icon: <FontAwesomeIcon icon={faRedo} />,
        enable: history.commands.redo,
        run: history.commands.redo,
      },
    ],
  },
]

export const MainToolbar: React.FC = () => (
  <Toolbar>
    {menu.map((group) => (
      <ToolbarGroup key={group.id}>
        {group.items.map((item) => (
          <ToolbarItem<EditorSchema> key={item.id} item={item}>
            {item.icon}
          </ToolbarItem>
        ))}
      </ToolbarGroup>
    ))}
  </Toolbar>
)
