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
import { Toolbar, ToolbarGroup, ToolbarItem } from '@pompom/react'
import React from 'react'

import {
  indentListItem,
  outdentListItem,
  redoAction,
  removeFormat,
  // setNodeTypeCodeBlock,
  setNodeTypeHeading,
  setNodeTypeParagraph,
  toggleBlockquote,
  toggleCode,
  toggleEmphasis,
  toggleStrikethrough,
  toggleStrong,
  toggleSubscript,
  toggleSuperscript,
  toggleUnderline,
  undoAction,
  wrapInOrderedList,
  wrapInUnorderedList,
} from '../config/actions'

export const MainToolbar: React.FC = () => (
  <Toolbar>
    {/*<ToolbarGroup>
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
    </ToolbarGroup>*/}

    <ToolbarGroup>
      <ToolbarItem action={setNodeTypeParagraph}>
        <FontAwesomeIcon icon={faParagraph} />
      </ToolbarItem>
      {/*<ToolbarItem action={setNodeTypeCodeBlock}>
        <FontAwesomeIcon icon={faCode} />
      </ToolbarItem>*/}
      <ToolbarItem action={setNodeTypeHeading}>
        <FontAwesomeIcon icon={faHeading} />
      </ToolbarItem>
    </ToolbarGroup>

    <ToolbarGroup>
      <ToolbarItem action={toggleBlockquote}>
        <FontAwesomeIcon icon={faQuoteLeft} />
      </ToolbarItem>
    </ToolbarGroup>

    <ToolbarGroup>
      <ToolbarItem action={wrapInOrderedList}>
        <FontAwesomeIcon icon={faListOl} />
      </ToolbarItem>
      <ToolbarItem action={wrapInUnorderedList}>
        <FontAwesomeIcon icon={faListUl} />
      </ToolbarItem>
      <ToolbarItem action={outdentListItem}>
        <FontAwesomeIcon icon={faOutdent} />
      </ToolbarItem>
      <ToolbarItem action={indentListItem}>
        <FontAwesomeIcon icon={faIndent} />
      </ToolbarItem>
    </ToolbarGroup>

    <ToolbarGroup>
      <ToolbarItem action={undoAction}>
        <FontAwesomeIcon icon={faUndo} />
      </ToolbarItem>
      <ToolbarItem action={redoAction}>
        <FontAwesomeIcon icon={faRedo} />
      </ToolbarItem>
    </ToolbarGroup>
  </Toolbar>
)
