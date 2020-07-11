import {
  faBold,
  faCode,
  faHeading,
  faItalic,
  faParagraph,
  faQuoteLeft,
  faRedo,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  baseKeymap,
  joinBackward,
  setBlockType,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { inputRules, textblockTypeInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { MarkType, Node, NodeType, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { Decoration, EditorProps, EditorView, NodeView } from 'prosemirror-view'
import React, { useMemo } from 'react'
import {
  blockActive,
  blockquote,
  code,
  code_block,
  createHtmlTransformer,
  doc,
  Editor,
  em,
  heading,
  markActive,
  paragraph,
  placeholder,
  strikethrough,
  strong,
  subscript,
  superscript,
  text,
  ToolbarSpec,
  underline,
} from 'react-prosemirror'

// 1. Define your schema

const nodes = { doc, paragraph, text, code_block, blockquote, heading }

type NodeName = keyof typeof nodes

const marks = {
  em,
  strong,
  code,
  superscript,
  subscript,
  underline,
  strikethrough,
}

type MarkName = keyof typeof marks

interface EditorSchema extends Schema {
  nodes: Record<NodeName, NodeType>
  marks: Record<MarkName, MarkType>
}

const schema: EditorSchema = new Schema({ nodes, marks })

// 2. Define your plugins

const plugins: Plugin<EditorSchema>[] = [
  history(),
  keymap<EditorSchema>({
    ...baseKeymap,
    'Mod-b': toggleMark(schema.marks.strong),
    'Mod-i': toggleMark(schema.marks.em),
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: joinBackward, // TODO: select all + delete
  }),
  placeholder<EditorSchema>(),
  inputRules({
    rules: [textblockTypeInputRule(/^```$/, schema.nodes.code_block)],
  }),
]

// 3. Define your toolbar(s)

const floatingToolbar: ToolbarSpec<EditorSchema> = {
  format: {
    strong: {
      title: 'Toggle strong',
      content: <FontAwesomeIcon icon={faBold} />,
      active: markActive(schema.marks.strong),
      enable: toggleMark(schema.marks.strong),
      run: toggleMark(schema.marks.strong),
    },
    em: {
      title: 'Toggle emphasis',
      content: <FontAwesomeIcon icon={faItalic} />,
      active: markActive(schema.marks.em),
      enable: toggleMark(schema.marks.em),
      run: toggleMark(schema.marks.em),
    },
    code: {
      title: 'Toggle code',
      content: <FontAwesomeIcon icon={faCode} />,
      active: markActive(schema.marks.code),
      enable: toggleMark(schema.marks.code),
      run: toggleMark(schema.marks.code),
    },
    subscript: {
      title: 'Toggle subscript',
      content: <FontAwesomeIcon icon={faSubscript} />,
      active: markActive(schema.marks.subscript),
      enable: toggleMark(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript),
    },
    superscript: {
      title: 'Toggle superscript',
      content: <FontAwesomeIcon icon={faSuperscript} />,
      active: markActive(schema.marks.superscript),
      enable: toggleMark(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript),
    },
    underline: {
      title: 'Toggle underline',
      content: <FontAwesomeIcon icon={faUnderline} />,
      active: markActive(schema.marks.underline),
      enable: toggleMark(schema.marks.underline),
      run: toggleMark(schema.marks.underline),
    },
    strikethrough: {
      title: 'Toggle strikethrough',
      content: <FontAwesomeIcon icon={faStrikethrough} />,
      active: markActive(schema.marks.strikethrough),
      enable: toggleMark(schema.marks.strikethrough),
      run: toggleMark(schema.marks.strikethrough),
    },
  },
}

const toolbar: ToolbarSpec<EditorSchema> = {
  blockType: {
    plain: {
      title: 'Change to paragraph',
      content: <FontAwesomeIcon icon={faParagraph} />,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph),
    },
    code_block: {
      title: 'Change to code block',
      content: <FontAwesomeIcon icon={faCode} />,
      active: blockActive(schema.nodes.code_block),
      enable: setBlockType(schema.nodes.code_block),
      run: setBlockType(schema.nodes.code_block),
    },
    h1: {
      title: 'Change to heading level 1',
      content: <FontAwesomeIcon icon={faHeading} />,
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 }),
    },
    blockquote: {
      title: 'Wrap in block quote',
      content: <FontAwesomeIcon icon={faQuoteLeft} />,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote),
    },
  },
  history: {
    undo: {
      title: 'Undo last change',
      content: <FontAwesomeIcon icon={faUndo} />,
      enable: undo,
      run: undo,
    },
    redo: {
      title: 'Redo last undone change',
      content: <FontAwesomeIcon icon={faRedo} />,
      enable: redo,
      run: redo,
    },
  },
}

// 4. define your transformer

const transformer = createHtmlTransformer<EditorSchema>(schema)

// 5. (optional) define your node views

type NodeViewCreator = (
  node: Node<EditorSchema>,
  view: EditorView<EditorSchema>,
  getPos: boolean | (() => number),
  decorations: Decoration[]
) => NodeView<EditorSchema>

// @ts-ignore (need to allow view for only some node types)
const nodeViews: Record<NodeName, NodeViewCreator> = {
  paragraph: (node, view, getPos, decorations) => {
    const contentDOM = document.createElement('p')

    return { contentDOM }
  },
}

export const HTMLEditor: React.FC<{
  autoFocus?: boolean
  handleBlur?: (event: Event) => void
  handleChange: (value: string) => void
  handleFocus?: (event: Event) => void
  value: string
}> = ({
  autoFocus = false,
  handleBlur,
  handleChange,
  handleFocus,
  value = '',
}) => {
  const editorProps = useMemo<EditorProps<unknown, EditorSchema>>(
    () => ({
      handleDOMEvents: {
        blur: (view, event) => {
          handleBlur && handleBlur(event)
          return false
        },
        focus: (view, event) => {
          handleFocus && handleFocus(event)
          return false
        },
      },
      nodeViews,
    }),
    [handleBlur, handleFocus]
  )

  return (
    <Editor<EditorSchema, string>
      autoFocus={autoFocus}
      editorProps={editorProps}
      handleChange={handleChange}
      plugins={plugins}
      schema={schema}
      toolbar={toolbar}
      floatingToolbar={floatingToolbar}
      transformer={transformer}
      value={value}
    />
  )
}
