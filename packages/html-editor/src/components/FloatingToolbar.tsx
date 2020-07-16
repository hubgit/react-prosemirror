import {
  faBold,
  faCode,
  faItalic,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Floater, isMarkActive, Toolbar, ToolbarItem } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'
import React from 'react'

import { EditorSchema } from '../schema'

export const FloatingToolbar: React.FC<{ schema: EditorSchema }> = ({
  schema,
}) => {
  return (
    <Floater>
      <Toolbar>
        <ToolbarItem
          title={'Toggle strong'}
          active={isMarkActive(schema.marks.strong)}
          enable={toggleMark(schema.marks.strong)}
          run={toggleMark(schema.marks.strong)}
        >
          <FontAwesomeIcon icon={faBold} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle emphasis'}
          active={isMarkActive(schema.marks.em)}
          enable={toggleMark(schema.marks.em)}
          run={toggleMark(schema.marks.em)}
        >
          <FontAwesomeIcon icon={faItalic} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle code'}
          active={isMarkActive(schema.marks.code)}
          enable={toggleMark(schema.marks.code)}
          run={toggleMark(schema.marks.code)}
        >
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle subscript'}
          active={isMarkActive(schema.marks.subscript)}
          enable={toggleMark(schema.marks.subscript)}
          run={toggleMark(schema.marks.subscript)}
        >
          <FontAwesomeIcon icon={faSubscript} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle superscript'}
          active={isMarkActive(schema.marks.superscript)}
          enable={toggleMark(schema.marks.superscript)}
          run={toggleMark(schema.marks.superscript)}
        >
          <FontAwesomeIcon icon={faSuperscript} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle underline'}
          active={isMarkActive(schema.marks.underline)}
          enable={toggleMark(schema.marks.underline)}
          run={toggleMark(schema.marks.underline)}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </ToolbarItem>
        <ToolbarItem
          title={'Toggle strikethrough'}
          active={isMarkActive(schema.marks.strikethrough)}
          enable={toggleMark(schema.marks.strikethrough)}
          run={toggleMark(schema.marks.strikethrough)}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </ToolbarItem>
      </Toolbar>
    </Floater>
  )
}
