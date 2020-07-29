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
} from '../config/actions'

export const FloatingToolbar: React.FC = () => (
  <Floater>
    <Toolbar>
      <ToolbarItem action={toggleStrong}>
        <FontAwesomeIcon icon={faBold} />
      </ToolbarItem>
      <ToolbarItem action={toggleEmphasis}>
        <FontAwesomeIcon icon={faItalic} />
      </ToolbarItem>
      <ToolbarItem action={toggleCode}>
        <FontAwesomeIcon icon={faCode} />
      </ToolbarItem>
      <ToolbarItem action={toggleSubscript}>
        <FontAwesomeIcon icon={faSubscript} />
      </ToolbarItem>
      <ToolbarItem action={toggleSuperscript}>
        <FontAwesomeIcon icon={faSuperscript} />
      </ToolbarItem>
      <ToolbarItem action={toggleUnderline}>
        <FontAwesomeIcon icon={faUnderline} />
      </ToolbarItem>
      <ToolbarItem action={toggleStrikethrough}>
        <FontAwesomeIcon icon={faStrikethrough} />
      </ToolbarItem>
      <ToolbarItem action={removeFormat}>
        <FontAwesomeIcon icon={faRemoveFormat} />
      </ToolbarItem>
    </Toolbar>
  </Floater>
)
