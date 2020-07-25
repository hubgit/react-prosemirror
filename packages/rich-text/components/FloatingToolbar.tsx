import {
  faBold,
  faCode,
  faItalic,
  faRemoveFormat,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isMarkActive, removeFormatting } from '@pompom/commands'
import { Floater, Toolbar, ToolbarGroup, ToolbarItem } from '@pompom/react'
import { toggleMark } from 'prosemirror-commands'
import React from 'react'

import { EditorSchema, schema } from '../schema'

const menu = [
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
]

export const FloatingToolbar: React.FC = () => (
  <Floater>
    <Toolbar>
      {menu.map((item) => (
        <ToolbarItem<EditorSchema> key={item.id} item={item}>
          {item.icon}
        </ToolbarItem>
      ))}
    </Toolbar>
  </Floater>
)
