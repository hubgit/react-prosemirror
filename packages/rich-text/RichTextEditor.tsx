import {
  faBold,
  faHeading,
  faItalic,
  faListOl,
  faListUl,
  faParagraph,
  faRemoveFormat,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  blockActive,
  markActive,
  Editor,
  removeFormatting,
  setListTypeOrWrapInList,
} from '@pompom/core'
import {
  bold,
  code,
  italic,
  strikethrough,
  subscript,
  superscript,
  underline,
} from '@pompom/marks'
import {
  blockquote,
  bulletList,
  codeBlock,
  doc,
  heading,
  image,
  listItem,
  orderedList,
  paragraph,
  table,
  tableDataCell,
  tableHeaderCell,
  tableRow,
  text,
} from '@pompom/nodes'
import { placeholder } from '@pompom/plugins'
import {
  EditorContent,
  EditorProvider,
  Floater,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from '@pompom/react'
import debounce from 'lodash.debounce'
import { baseKeymap, setBlockType, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import {
  inputRules,
  textblockTypeInputRule,
  undoInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { DOMParser, DOMSerializer, Node, Schema } from 'prosemirror-model'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { Plugin } from 'prosemirror-state'
import { tableEditing } from 'prosemirror-tables'
import { EditorProps } from 'prosemirror-view'
import React, { useEffect } from 'react'

const schema = new Schema({
  marks: {
    bold,
    code,
    italic,
    strikethrough,
    subscript,
    superscript,
    underline,
  },
  nodes: {
    text,
    doc,
    paragraph,
    heading,
    blockquote,
    codeBlock,
    image,
    bulletList,
    orderedList,
    listItem,
    table,
    tableRow,
    tableDataCell,
    tableHeaderCell,
  },
})

// TODO: nodeViews

const plugins: Plugin[] = [
  keymap({
    'Mod-]': sinkListItem(schema.nodes.listItem),
    'Mod-[': liftListItem(schema.nodes.listItem),
    Tab: sinkListItem(schema.nodes.listItem),
    'Shift-Tab': liftListItem(schema.nodes.listItem),
    Enter: splitListItem(schema.nodes.listItem),
    // TODO: backspace in list?
  }),
  keymap({
    'Mod-`': toggleMark(schema.marks.code),
    'Mod-b': toggleMark(schema.marks.bold),
    'Mod-i': toggleMark(schema.marks.italic),
  }),
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
  }),
  keymap({
    Backspace: undoInputRule,
  }),
  keymap(baseKeymap),
  inputRules({
    rules: [
      // # heading
      textblockTypeInputRule(
        new RegExp('^(#{1,6})\\s$'),
        schema.nodes.heading,
        (match) => ({ level: match[1].length })
      ),

      // ``` code block
      textblockTypeInputRule(/^```$/, schema.nodes.codeblock),

      // > blockquote
      wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),

      // * bullet list
      wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bulletList),

      // 1. ordered list
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.orderedList,
        (match) => ({ start: +match[1] }),
        (match, node) => node.childCount + node.attrs.start === +match[1]
      ),
    ],
  }),
  history(),
  tableEditing(),
  placeholder(),
]

const editorProps: EditorProps = {
  nodeViews: {}, // TODO
}

const parser = DOMParser.fromSchema(schema)
const serializer = DOMSerializer.fromSchema(schema)

const importHTML = (input?: string): Node => {
  const template = document.createElement('template')

  if (input !== undefined) {
    template.innerHTML = input
  }

  return parser.parse(template.content)
}

const exportHTML = (output: Node): string => {
  const container = document.createElement('div')

  container.appendChild(serializer.serializeFragment(output.content))

  return container.innerHTML
}

const editor = new Editor(schema, plugins, editorProps)

export const RichTextEditor = React.memo<{
  autoFocus?: boolean
  delay?: number
  handleChange: (value: string) => void
  value?: string
}>(({ autoFocus = false, delay = 500, value = '', handleChange }) => {
  useEffect(() => {
    const handler = debounce((event: Event) => {
      const doc = (event as CustomEvent).detail
      const output = exportHTML(doc)
      if (output !== value) {
        handleChange(output)
      }
    }, delay)

    editor.addEventListener('docchange', handler)

    return () => {
      editor.removeEventListener('docchange', handler)
    }
  }, [handleChange, value])

  useEffect(() => {
    editor.setDoc(importHTML(value))
  }, [value])

  return (
    <EditorProvider editor={editor}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem
            title={'Toggle bold'}
            active={markActive(schema.marks.bold)}
            enable={toggleMark(schema.marks.bold)}
            run={toggleMark(schema.marks.bold)}
          >
            <FontAwesomeIcon icon={faBold} />
          </ToolbarItem>
          <ToolbarItem
            title={'Toggle italic'}
            active={markActive(schema.marks.italic)}
            enable={toggleMark(schema.marks.italic)}
            run={toggleMark(schema.marks.italic)}
          >
            <FontAwesomeIcon icon={faItalic} />
          </ToolbarItem>
          <ToolbarItem
            title={'Toggle subscript'}
            active={markActive(schema.marks.subscript)}
            enable={toggleMark(schema.marks.subscript)}
            run={toggleMark(schema.marks.subscript)}
          >
            <FontAwesomeIcon icon={faSubscript} />
          </ToolbarItem>
          <ToolbarItem
            title={'Toggle superscript'}
            active={markActive(schema.marks.superscript)}
            enable={toggleMark(schema.marks.superscript)}
            run={toggleMark(schema.marks.superscript)}
          >
            <FontAwesomeIcon icon={faSuperscript} />
          </ToolbarItem>
          <ToolbarItem
            title={'Toggle strikethrough'}
            active={markActive(schema.marks.strikethrough)}
            enable={toggleMark(schema.marks.strikethrough)}
            run={toggleMark(schema.marks.strikethrough)}
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </ToolbarItem>
          <ToolbarItem
            title={'Toggle underline'}
            active={markActive(schema.marks.underline)}
            enable={toggleMark(schema.marks.underline)}
            run={toggleMark(schema.marks.underline)}
          >
            <FontAwesomeIcon icon={faUnderline} />
          </ToolbarItem>
          <ToolbarItem
            title={'Remove formatting'}
            enable={removeFormatting}
            run={removeFormatting}
          >
            <FontAwesomeIcon icon={faRemoveFormat} />
          </ToolbarItem>
        </ToolbarGroup>

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
            title={'Change to heading'}
            active={blockActive(schema.nodes.heading)}
            enable={setBlockType(schema.nodes.heading)}
            run={setBlockType(schema.nodes.heading)}
          >
            <FontAwesomeIcon icon={faHeading} />
          </ToolbarItem>
          <ToolbarItem
            title={'Change to ordered list'}
            active={blockActive(schema.nodes.orderedList)}
            enable={setListTypeOrWrapInList(schema.nodes.orderedList)}
            run={setListTypeOrWrapInList(schema.nodes.orderedList)}
          >
            <FontAwesomeIcon icon={faListOl} />
          </ToolbarItem>
          <ToolbarItem
            title={'Change to bullet list'}
            active={blockActive(schema.nodes.bulletList)}
            enable={setListTypeOrWrapInList(schema.nodes.bulletList)}
            run={setListTypeOrWrapInList(schema.nodes.bulletList)}
          >
            <FontAwesomeIcon icon={faListUl} />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>

      {/*<Floater>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarItem
              title={'Remove formatting'}
              enable={removeFormatting}
              run={removeFormatting}
            >
              <FontAwesomeIcon icon={faRemoveFormat} />
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </Floater>*/}

      <EditorContent autoFocus={autoFocus} />
    </EditorProvider>
  )
})
