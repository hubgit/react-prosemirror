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
import { Floater, Toolbar, ToolbarItem } from '@pompom/react'
import React from 'react'

import {
  removeFormat,
  toggleCode,
  toggleEmphasis,
  toggleStrikethrough,
  toggleStrong,
  toggleSubscript,
  toggleSuperscript,
  toggleUnderline,
} from '../actions'
import { EditorSchema } from '../schema'

export const FloatingToolbar: React.FC = () => (
  <Floater>
    <Toolbar>
      <ToolbarItem<EditorSchema> action={toggleStrong}>
        <FontAwesomeIcon icon={faBold} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleEmphasis}>
        <FontAwesomeIcon icon={faItalic} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleCode}>
        <FontAwesomeIcon icon={faCode} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleSubscript}>
        <FontAwesomeIcon icon={faSubscript} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleSuperscript}>
        <FontAwesomeIcon icon={faSuperscript} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleUnderline}>
        <FontAwesomeIcon icon={faUnderline} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={toggleStrikethrough}>
        <FontAwesomeIcon icon={faStrikethrough} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> action={removeFormat}>
        <FontAwesomeIcon icon={faRemoveFormat} />
      </ToolbarItem>
    </Toolbar>
  </Floater>
)
