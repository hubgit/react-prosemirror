// https://fontawesome.com/icons?c=editors
import { faBold, faCode, faHeading, faItalic, faListOl, faListUl, faOutdent, faParagraph, faQuoteLeft, faRedo, faRemoveFormat, faStrikethrough, faSubscript, faSuperscript, faUnderline, faUndo, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isBlockActive, isMarkActive, removeFormatting, toggleWrap, Toolbar, ToolbarGroup, ToolbarItem, } from '@pompom/core';
import { lift, setBlockType, toggleMark } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { wrapInList } from 'prosemirror-schema-list';
import React from 'react';
export const MainToolbar = ({ schema }) => {
    return (<Toolbar>
      <ToolbarGroup>
        <ToolbarItem title={'Toggle strong'} active={isMarkActive(schema.marks.strong)} enable={toggleMark(schema.marks.strong)} run={toggleMark(schema.marks.strong)}>
          <FontAwesomeIcon icon={faBold}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle emphasis'} active={isMarkActive(schema.marks.em)} enable={toggleMark(schema.marks.em)} run={toggleMark(schema.marks.em)}>
          <FontAwesomeIcon icon={faItalic}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle code'} active={isMarkActive(schema.marks.code)} enable={toggleMark(schema.marks.code)} run={toggleMark(schema.marks.code)}>
          <FontAwesomeIcon icon={faCode}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle subscript'} active={isMarkActive(schema.marks.subscript)} enable={toggleMark(schema.marks.subscript)} run={toggleMark(schema.marks.subscript)}>
          <FontAwesomeIcon icon={faSubscript}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle superscript'} active={isMarkActive(schema.marks.superscript)} enable={toggleMark(schema.marks.superscript)} run={toggleMark(schema.marks.superscript)}>
          <FontAwesomeIcon icon={faSuperscript}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle underline'} active={isMarkActive(schema.marks.underline)} enable={toggleMark(schema.marks.underline)} run={toggleMark(schema.marks.underline)}>
          <FontAwesomeIcon icon={faUnderline}/>
        </ToolbarItem>
        <ToolbarItem title={'Toggle strikethrough'} active={isMarkActive(schema.marks.strikethrough)} enable={toggleMark(schema.marks.strikethrough)} run={toggleMark(schema.marks.strikethrough)}>
          <FontAwesomeIcon icon={faStrikethrough}/>
        </ToolbarItem>
        <ToolbarItem title={'Remove formattting'} run={removeFormatting}>
          <FontAwesomeIcon icon={faRemoveFormat}/>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarItem title={'Change to paragraph'} active={isBlockActive(schema.nodes.paragraph)} enable={setBlockType(schema.nodes.paragraph)} run={setBlockType(schema.nodes.paragraph)}>
          <FontAwesomeIcon icon={faParagraph}/>
        </ToolbarItem>
        <ToolbarItem title={'Change to code block'} active={isBlockActive(schema.nodes.code_block)} enable={setBlockType(schema.nodes.code_block)} run={setBlockType(schema.nodes.code_block)}>
          <FontAwesomeIcon icon={faCode}/>
        </ToolbarItem>
        <ToolbarItem title={'Change to heading level 1'} active={isBlockActive(schema.nodes.heading, { level: 1 })} enable={setBlockType(schema.nodes.heading, { level: 1 })} run={setBlockType(schema.nodes.heading, { level: 1 })}>
          <FontAwesomeIcon icon={faHeading}/>
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem title={'Wrap in block quote'} active={toggleWrap(schema.nodes.blockquote)} 
    // enable={toggleWrap(schema.nodes.blockquote)}
    run={toggleWrap(schema.nodes.blockquote)}>
          <FontAwesomeIcon icon={faQuoteLeft}/>
        </ToolbarItem>
        <ToolbarItem title={'Wrap in ordered list'} active={isBlockActive(schema.nodes.list, { type: 'ordered' })} enable={wrapInList(schema.nodes.list, { type: 'ordered' })} run={wrapInList(schema.nodes.list, { type: 'ordered' })}>
          <FontAwesomeIcon icon={faListOl}/>
        </ToolbarItem>
        <ToolbarItem title={'Wrap in unordered list'} active={isBlockActive(schema.nodes.list, { type: 'unordered' })} enable={wrapInList(schema.nodes.list, { type: 'unordered' })} run={wrapInList(schema.nodes.list, { type: 'unordered' })}>
          <FontAwesomeIcon icon={faListUl}/>
        </ToolbarItem>
        <ToolbarItem title={'Lift'} enable={lift} run={lift}>
          <FontAwesomeIcon icon={faOutdent}/>
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem title={'Undo last change'} enable={undo} run={undo}>
          <FontAwesomeIcon icon={faUndo}/>
        </ToolbarItem>
        <ToolbarItem title={'Redo last change'} enable={redo} run={redo}>
          <FontAwesomeIcon icon={faRedo}/>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>);
};
//# sourceMappingURL=MainToolbar.jsx.map