// https://fontawesome.com/icons?c=editors
import {
  faBold,
  faCode,
  faHeading,
  faItalic,
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
import { Toolbar, ToolbarGroup, ToolbarItem, usePomPom } from '@pompom/react'
import React from 'react'

export const MainToolbar: React.FC = () => {
  const {
    pompom: { actions },
  } = usePomPom()

  // TODO: pompom.toggleMark?

  return (
    <Toolbar>
      <ToolbarGroup>
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
        <ToolbarItem action={actions.removeFormatting}>
          <FontAwesomeIcon icon={faRemoveFormat} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem action={actions.setNodeTypeParagraph}>
          <FontAwesomeIcon icon={faParagraph} />
        </ToolbarItem>
        {/*  <ToolbarItem action={actions.wrapInCodeBlock}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>*/}
        <ToolbarItem action={actions.setNodeTypeHeading}>
          <FontAwesomeIcon icon={faHeading} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem action={actions.toggleBlockquote}>
          <FontAwesomeIcon icon={faQuoteLeft} />
        </ToolbarItem>
      </ToolbarGroup>

      {/* <ToolbarGroup>
      <ToolbarItem action={actions.wrapInOrderedList}>
        <FontAwesomeIcon icon={faListOl} />
      </ToolbarItem>
      <ToolbarItem action={actions.wrapInUnorderedList}>
        <FontAwesomeIcon icon={faListUl} />
      </ToolbarItem>
      <ToolbarItem action={actions.outdentListItem}>
        <FontAwesomeIcon icon={faOutdent} />
      </ToolbarItem>
      <ToolbarItem action={actions.indentListItem}>
        <FontAwesomeIcon icon={faIndent} />
      </ToolbarItem>
    </ToolbarGroup>*/}

      <ToolbarGroup>
        <ToolbarItem action={actions.undo}>
          <FontAwesomeIcon icon={faUndo} />
        </ToolbarItem>
        <ToolbarItem action={actions.redo}>
          <FontAwesomeIcon icon={faRedo} />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  )
}
