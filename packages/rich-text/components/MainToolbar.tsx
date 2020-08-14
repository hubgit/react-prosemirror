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

export const MainToolbar = React.memo(() => {
  const {
    pompom: { actions, toggleMark, setBlockType },
  } = usePomPom<
    string,
    'paragraph' | 'heading',
    | 'strong'
    | 'emphasis'
    | 'code'
    | 'subscript'
    | 'superscript'
    | 'underline'
    | 'strikethrough'
  >()

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem action={toggleMark.strong} title={'Toggle strong'}>
          <FontAwesomeIcon icon={faBold} />
        </ToolbarItem>
        <ToolbarItem action={toggleMark.emphasis} title={'Toggle emphasis'}>
          <FontAwesomeIcon icon={faItalic} />
        </ToolbarItem>
        <ToolbarItem action={toggleMark.code} title={'Toggle code'}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem action={toggleMark.subscript} title={'Toggle subscript'}>
          <FontAwesomeIcon icon={faSubscript} />
        </ToolbarItem>
        <ToolbarItem
          action={toggleMark.superscript}
          title={'Toggle superscript'}
        >
          <FontAwesomeIcon icon={faSuperscript} />
        </ToolbarItem>
        <ToolbarItem action={toggleMark.underline} title={'Toggle underline'}>
          <FontAwesomeIcon icon={faUnderline} />
        </ToolbarItem>
        <ToolbarItem
          action={toggleMark.strikethrough}
          title={'Toggle strikethrough'}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </ToolbarItem>
        <ToolbarItem
          action={actions.removeFormatting}
          title={'Remove formatting'}
        >
          <FontAwesomeIcon icon={faRemoveFormat} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem
          action={setBlockType.paragraph}
          title={'Change to paragraph'}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </ToolbarItem>
        {/*  <ToolbarItem action={actions.wrapInCodeBlock}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>*/}
        <ToolbarItem action={setBlockType.heading} title={'Change to heading'}>
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
})
