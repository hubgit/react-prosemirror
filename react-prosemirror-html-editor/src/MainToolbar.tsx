import {
  faCode,
  faHeading,
  faListOl,
  faListUl,
  faOutdent,
  faParagraph,
  faQuoteLeft,
  faRedo,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lift, setBlockType, wrapIn } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { wrapInList } from 'prosemirror-schema-list'
import React from 'react'
import {
  blockActive,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from 'react-prosemirror'

import { schema } from './schema'

export const MainToolbar: React.FC = () => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem
          title={'Change to paragraph'}
          active={blockActive(schema.nodes.paragraph)}
          enable={setBlockType(schema.nodes.paragraph)}
          run={setBlockType(schema.nodes.paragraph)}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </ToolbarItem>
        <ToolbarItem
          title={'Change to code block'}
          active={blockActive(schema.nodes.code_block)}
          enable={setBlockType(schema.nodes.code_block)}
          run={setBlockType(schema.nodes.code_block)}
        >
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem
          title={'Change to heading level 1'}
          active={blockActive(schema.nodes.heading, { level: 1 })}
          enable={setBlockType(schema.nodes.heading, { level: 1 })}
          run={setBlockType(schema.nodes.heading, { level: 1 })}
        >
          <FontAwesomeIcon icon={faHeading} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem
          title={'Wrap in block quote'}
          active={blockActive(schema.nodes.blockquote)}
          enable={wrapIn(schema.nodes.blockquote)}
          run={wrapIn(schema.nodes.blockquote)}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </ToolbarItem>
        <ToolbarItem
          title={'Wrap in ordered list'}
          active={blockActive(schema.nodes.list, { type: 'ordered' })}
          enable={wrapInList(schema.nodes.list, { type: 'ordered' })}
          run={wrapInList(schema.nodes.list, { type: 'ordered' })}
        >
          <FontAwesomeIcon icon={faListOl} />
        </ToolbarItem>
        <ToolbarItem
          title={'Wrap in unordered list'}
          active={blockActive(schema.nodes.list, { type: 'unordered' })}
          enable={wrapInList(schema.nodes.list, { type: 'unordered' })}
          run={wrapInList(schema.nodes.list, { type: 'unordered' })}
        >
          <FontAwesomeIcon icon={faListUl} />
        </ToolbarItem>
        <ToolbarItem title={'Lift'} enable={lift} run={lift}>
          <FontAwesomeIcon icon={faOutdent} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem title={'Undo last change'} enable={undo} run={undo}>
          <FontAwesomeIcon icon={faUndo} />
        </ToolbarItem>
        <ToolbarItem title={'Redo last change'} enable={redo} run={redo}>
          <FontAwesomeIcon icon={faRedo} />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  )
}
