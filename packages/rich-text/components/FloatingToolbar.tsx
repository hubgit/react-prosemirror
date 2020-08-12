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
import { Floater, Toolbar, ToolbarItem, usePomPom } from '@pompom/react'
import React from 'react'

export const FloatingToolbar: React.FC = () => {
  const {
    pompom: { actions },
  } = usePomPom()

  return (
    <Floater>
      <Toolbar>
        <ToolbarItem action={actions.toggleMarkStrong}>
          <FontAwesomeIcon icon={faBold} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkEmphasis}>
          <FontAwesomeIcon icon={faItalic} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkCode}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkSubscript}>
          <FontAwesomeIcon icon={faSubscript} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkSuperscript}>
          <FontAwesomeIcon icon={faSuperscript} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkUnderline}>
          <FontAwesomeIcon icon={faUnderline} />
        </ToolbarItem>
        <ToolbarItem action={actions.toggleMarkStrikethrough}>
          <FontAwesomeIcon icon={faStrikethrough} />
        </ToolbarItem>
      </Toolbar>
    </Floater>
  )
}
