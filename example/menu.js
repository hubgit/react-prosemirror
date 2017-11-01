import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { joinUp, lift, setBlockType, toggleMark, wrapIn } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { wrapInList } from 'prosemirror-schema-list'
// import { addColumnAfter, addColumnBefore } from 'prosemirror-tables'
import { faBold, faItalic, faCode, faSuperscript, faSubscript, faLink, faParagraph, faHeading, faQuoteLeft, faListOl, faListUl, faImage, faTable, faUndo, faRedo, faOutdent, faAngleUp } from '@fortawesome/fontawesome-free-solid'

import schema from './schema'

const markActive = type => state => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection

  if (node) {
    return node.hasMarkup(type, attrs)
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}

const canInsert = type => state => {
  const { $from } = state.selection

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true
    }
  }

  return false
}

const promptForURL = () => {
  let url = window.prompt('Enter the URL', 'https://')

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'http://' + url
  }

  return url
}

export default {
  marks: {
    em: {
      title: 'Toggle emphasis',
      content: <FontAwesomeIcon icon={faItalic} />,
      active: markActive(schema.marks.em),
      run: toggleMark(schema.marks.em)
    },
    strong: {
      title: 'Toggle strong',
      content: <FontAwesomeIcon icon={faBold} />,
      active: markActive(schema.marks.strong),
      run: toggleMark(schema.marks.strong)
    },
    code: {
      title: 'Toggle code',
      content: <FontAwesomeIcon icon={faCode} />,
      active: markActive(schema.marks.code),
      run: toggleMark(schema.marks.code)
    },
    subscript: {
      title: 'Toggle subscript',
      content: <FontAwesomeIcon icon={faSubscript} />,
      active: markActive(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript)
    },
    superscript: {
      title: 'Toggle superscript',
      content: <FontAwesomeIcon icon={faSuperscript} />,
      active: markActive(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript)
    },
    link: {
      title: 'Add or remove link',
      content: <FontAwesomeIcon icon={faLink} />,
      active: markActive(schema.marks.link),
      enable: state => !state.selection.empty,
      run (state, dispatch) {
        if (markActive(schema.marks.link)(state)) {
          toggleMark(schema.marks.link)(state, dispatch)
          return true
        }

        const href = promptForURL()
        if (!href) return false

        toggleMark(schema.marks.link, { href })(state, dispatch)
        // view.focus()
      }
    }
  },
  blocks: {
    plain: {
      title: 'Change to paragraph',
      content: <FontAwesomeIcon icon={faParagraph} />,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph)
    },
    code_block: {
      title: 'Change to code block',
      content: <FontAwesomeIcon icon={faCode} />,
      active: blockActive(schema.nodes.code_block),
      enable: setBlockType(schema.nodes.code_block),
      run: setBlockType(schema.nodes.code_block)
    },
    h1: {
      title: 'Change to heading level 1',
      content: <FontAwesomeIcon icon={faHeading} />,
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 })
    },
    // h2: {
    //   title: 'Change to heading level 2',
    //   content: 'H2',
    //   active: blockActive(schema.nodes.heading, { level: 2 }),
    //   enable: setBlockType(schema.nodes.heading, { level: 2 }),
    //   run: setBlockType(schema.nodes.heading, { level: 2 })
    // },
    blockquote: {
      title: 'Wrap in block quote',
      content: <FontAwesomeIcon icon={faQuoteLeft} />,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote)
    },
    unorderedList: {
      title: 'Wrap in bullet list',
      content: <FontAwesomeIcon icon={faListUl} />,
      active: blockActive(schema.nodes.bullet_list),
      enable: wrapInList(schema.nodes.bullet_list),
      run: wrapInList(schema.nodes.bullet_list)
    },
    orderedList: {
      title: 'Wrap in ordered list',
      content: <FontAwesomeIcon icon={faListOl} />,
      active: blockActive(schema.nodes.ordered_list),
      enable: wrapInList(schema.nodes.ordered_list),
      run: wrapInList(schema.nodes.ordered_list)
    },
    lift: {
      title: 'Lift out of enclosing block',
      content: <FontAwesomeIcon icon={faOutdent} />,
      enable: lift,
      run: lift
    },
    joinUp: {
      title: 'Join with above block',
      content: <FontAwesomeIcon icon={faAngleUp} />,
      enable: joinUp,
      run: joinUp
    }
  },
  insert: {
    image: {
      title: 'Insert image',
      content: <FontAwesomeIcon icon={faImage} />,
      enable: canInsert(schema.nodes.image),
      run: (state, dispatch) => {
        const src = promptForURL()
        if (!src) return false

        const img = schema.nodes.image.createAndFill({ src })
        dispatch(state.tr.replaceSelectionWith(img))
      }
    },
    // hr: {
    //   title: 'Insert horizontal rule',
    //   content: 'HR',
    //   enable: canInsert(schema.nodes.horizontal_rule),
    //   run: (state, dispatch) => {
    //     const hr = schema.nodes.horizontal_rule.create()
    //     dispatch(state.tr.replaceSelectionWith(hr))
    //   }
    // },
    table: {
      title: 'Insert table',
      content: <FontAwesomeIcon icon={faTable} />,
      enable: canInsert(schema.nodes.table),
      run: (state, dispatch) => {
        // const { from } = state.selection
        let rowCount = window.prompt('How many rows?', 2)
        let colCount = window.prompt('How many columns?', 2)

        const cells = []
        while (colCount--) {
          cells.push(schema.nodes.table_cell.createAndFill())
        }

        const rows = []
        while (rowCount--) {
          rows.push(schema.nodes.table_row.createAndFill(null, cells))
        }

        const table = schema.nodes.table.createAndFill(null, rows)
        dispatch(state.tr.replaceSelectionWith(table))

        // const tr = state.tr.replaceSelectionWith(table)
        // tr.setSelection(Selection.near(tr.doc.resolve(from)))
        // dispatch(tr.scrollIntoView())
        // view.focus()
      }
    }
  },
  history: {
    undo: {
      title: 'Undo last change',
      content: <FontAwesomeIcon icon={faUndo} />,
      enable: undo,
      run: undo
    },
    redo: {
      title: 'Redo last undone change',
      content: <FontAwesomeIcon icon={faRedo} />,
      enable: redo,
      run: redo
    }
  },
  table: {
    // addColumnBefore: {
    //   title: 'Insert column before',
    //   content: 'After',
    //   active: addColumnBefore, // TOOD: active -> select
    //   run: addColumnBefore
    // },
    // addColumnAfter: {
    //   title: 'Insert column before',
    //   content: 'Before',
    //   active: addColumnAfter, // TOOD: active -> select
    //   run: addColumnAfter
    // }
  }
}
