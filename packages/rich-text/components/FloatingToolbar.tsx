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
import { Floater, Toolbar, ToolbarItem } from '@pompom/editor'
import React from 'react'

import { EditorSchema } from '../schema'
import { format } from './MainToolbar'

export const FloatingToolbar: React.FC = () => (
  <Floater>
    <Toolbar>
      <ToolbarItem<EditorSchema> item={format.strong}>
        <FontAwesomeIcon icon={faBold} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.emphasis}>
        <FontAwesomeIcon icon={faItalic} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.code}>
        <FontAwesomeIcon icon={faCode} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.subscript}>
        <FontAwesomeIcon icon={faSubscript} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.superscript}>
        <FontAwesomeIcon icon={faSuperscript} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.underline}>
        <FontAwesomeIcon icon={faUnderline} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.strikethrough}>
        <FontAwesomeIcon icon={faStrikethrough} />
      </ToolbarItem>
      <ToolbarItem<EditorSchema> item={format.removeFormat}>
        <FontAwesomeIcon icon={faRemoveFormat} />
      </ToolbarItem>
    </Toolbar>
  </Floater>
)
