import { joinUp, lift, setBlockType, toggleMark, wrapIn } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { wrapInList } from 'prosemirror-schema-list'
// import { addColumnAfter, addColumnBefore } from 'prosemirror-tables'

import schema from './schema'
import icons from './icons'

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
      content: icons.em,
      active: markActive(schema.marks.em),
      run: toggleMark(schema.marks.em)
    },
    strong: {
      title: 'Toggle strong',
      content: icons.strong,
      active: markActive(schema.marks.strong),
      run: toggleMark(schema.marks.strong)
    },
    code: {
      title: 'Toggle code',
      content: icons.code,
      active: markActive(schema.marks.code),
      run: toggleMark(schema.marks.code)
    },
    subscript: {
      title: 'Toggle subscript',
      content: icons.subscript,
      active: markActive(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript)
    },
    superscript: {
      title: 'Toggle superscript',
      content: icons.superscript,
      active: markActive(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript)
    },
    link: {
      title: 'Add or remove link',
      content: icons.link,
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
      content: icons.paragraph,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph)
    },
    code_block: {
      title: 'Change to code block',
      content: icons.code_block,
      active: blockActive(schema.nodes.code_block),
      enable: setBlockType(schema.nodes.code_block),
      run: setBlockType(schema.nodes.code_block)
    },
    h1: {
      title: 'Change to heading level 1',
      content: icons.heading,
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
      content: icons.blockquote,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote)
    },
    bullet_list: {
      title: 'Wrap in bullet list',
      content: icons.bullet_list,
      active: blockActive(schema.nodes.bullet_list),
      enable: wrapInList(schema.nodes.bullet_list),
      run: wrapInList(schema.nodes.bullet_list)
    },
    ordered_list: {
      title: 'Wrap in ordered list',
      content: icons.ordered_list,
      active: blockActive(schema.nodes.ordered_list),
      enable: wrapInList(schema.nodes.ordered_list),
      run: wrapInList(schema.nodes.ordered_list)
    },
    lift: {
      title: 'Lift out of enclosing block',
      content: icons.lift,
      enable: lift,
      run: lift
    },
    join_up: {
      title: 'Join with above block',
      content: icons.join_up,
      enable: joinUp,
      run: joinUp
    }
  },
  insert: {
    image: {
      title: 'Insert image',
      content: icons.image,
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
      content: icons.table,
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
      content: icons.undo,
      enable: undo,
      run: undo
    },
    redo: {
      title: 'Redo last undone change',
      content: icons.redo,
      enable: redo,
      run: redo
    }
  },
  table: {
    // addColumnBefore: {
    //   title: 'Insert column before',
    //   content: icons.after,
    //   active: addColumnBefore, // TOOD: active -> select
    //   run: addColumnBefore
    // },
    // addColumnAfter: {
    //   title: 'Insert column before',
    //   content: icons.before,
    //   active: addColumnAfter, // TOOD: active -> select
    //   run: addColumnAfter
    // }
  }
}
