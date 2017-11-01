import {
  blockTypeItem,
  Dropdown,
  DropdownSubmenu,
  joinUpItem,
  liftItem,
  MenuItem,
  redoItem,
  // selectParentNodeItem,
  undoItem,
  wrapItem
} from 'prosemirror-menu'

import {
  addColumnAfter,
  addColumnBefore,
  deleteColumn,
  addRowAfter,
  addRowBefore,
  deleteRow,
  mergeCells,
  splitCell,
  toggleHeaderRow,
  toggleHeaderColumn,
  toggleHeaderCell,
  deleteTable
} from 'prosemirror-tables'

import { wrapInList } from 'prosemirror-schema-list'
import { toggleMark } from 'prosemirror-commands'
import { NodeSelection, Selection } from 'prosemirror-state'

import schema from './schema'
import icons from './icons'
import prompt from './prompt'
import { TextField } from './fields'

const canInsert = (state, nodeType) => {
  let $from = state.selection.$from

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, nodeType)) {
      return true
    }
  }

  return false
}

const markActive = (state, type) => {
  let { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

const cmdItem = (cmd, options) => {
  options.label = options.title
  options.run = cmd

  if ((!options.enable || options.enable === true) && !options.select) {
    options[options.enable ? 'enable' : 'select'] = state => cmd(state)
  }

  return new MenuItem(options)
}

const wrapListItem = (nodeType, options) => {
  return cmdItem(wrapInList(nodeType, options.attrs), options)
}

const markItem = (markType, options) => {
  options.active = state => markActive(state, markType)
  options.enable = true

  return cmdItem(toggleMark(markType), options)
}

const toggleStrong = markItem(schema.marks.strong, {
  title: 'Toggle strong style',
  icon: icons.strong
})

const toggleEm = markItem(schema.marks.em, {
  title: 'Toggle emphasis',
  icon: icons.em
})

const toggleCode = markItem(schema.marks.code, {
  title: 'Toggle code font',
  icon: icons.code
})

const toggleSubscript = markItem(schema.marks.subscript, {
  title: 'Toggle subscript',
  icon: icons.subscript
})

const toggleSuperscript = markItem(schema.marks.superscript, {
  title: 'Toggle superscript',
  icon: icons.superscript
})

const toggleLink = new MenuItem({
  title: 'Add or remove link',
  icon: icons.link,
  active (state) {
    return markActive(state, schema.marks.link)
  },
  enable (state) {
    return !state.selection.empty
  },
  run (state, dispatch, view) {
    if (markActive(state, schema.marks.link)) {
      toggleMark(schema.marks.link)(state, dispatch)
      return true
    }
    prompt({
      title: 'Create a link',
      fields: {
        href: new TextField({
          label: 'Link target',
          required: true,
          clean: val => {
            if (!/^https?:\/\//i.test(val)) {
              val = 'http://' + val
            }
            return val
          }
        }),
        title: new TextField({
          label: 'Title'
        })
      },
      callback (attrs) {
        toggleMark(schema.marks.link, attrs)(view.state, view.dispatch)
        view.focus()
      }
    })
  }
})

const selectionAttributes = selection => {
  return selection instanceof NodeSelection && selection.node.type === schema.nodes.image
    ? selection.node.attrs
    : null
}

const insertImage = new MenuItem({
  title: 'Insert image',
  label: 'Image',
  enable (state) {
    return canInsert(state, schema.nodes.image)
  },
  run (state, _, view) {
    const { from, to } = state.selection
    const attrs = selectionAttributes(state.selection)

    prompt({
      title: 'Insert image',
      fields: {
        src: new TextField({
          label: 'Location',
          required: true,
          value: attrs && attrs.src
        }),
        title: new TextField({
          label: 'Title',
          value: attrs && attrs.title
        }),
        alt: new TextField({
          label: 'Description',
          value: attrs ? attrs.alt : state.doc.textBetween(from, to, ' ')
        })
      },
      callback (attrs) {
        view.dispatch(view.state.tr.replaceSelectionWith(schema.nodes.image.createAndFill(attrs)))
        view.focus()
      }
    })
  }
})

const wrapBulletList = wrapListItem(schema.nodes.bullet_list, {
  title: 'Wrap in bullet list',
  icon: icons.bulletList
})

const wrapOrderedList = wrapListItem(schema.nodes.ordered_list, {
  title: 'Wrap in ordered list',
  icon: icons.orderedList
})

const wrapBlockQuote = wrapItem(schema.nodes.blockquote, {
  title: 'Wrap in block quote',
  icon: icons.blockquote
})

const makeParagraph = blockTypeItem(schema.nodes.paragraph, {
  title: 'Change to paragraph',
  label: 'Plain'
})

const makeCodeBlock = blockTypeItem(schema.nodes.code_block, {
  title: 'Change to code block',
  label: 'Code'
})

const insertHorizontalRule = new MenuItem({
  title: 'Insert horizontal rule',
  label: 'Horizontal rule',
  enable (state) {
    return canInsert(state, schema.nodes.horizontal_rule)
  },
  run (state, dispatch) {
    dispatch(state.tr.replaceSelectionWith(schema.nodes.horizontal_rule.create()))
  }
})

const positiveInteger = value => {
  if (!/^[1-9]\d*$/.test(value)) {
    return 'Should be a positive integer'
  }
}

const insertTable = new MenuItem({
  title: 'Insert table',
  label: 'Table',
  enable (state) {
    return canInsert(state, schema.nodes.table)
  },
  run (state, _, view) {
    const { from } = state.selection

    prompt({
      title: 'Insert table',
      fields: {
        rows: new TextField({
          label: 'Rows',
          required: true,
          validate: positiveInteger
        }),
        cols: new TextField({
          label: 'Columns',
          required: true,
          validate: positiveInteger
        })
      },
      callback (attrs) {
        const cells = []
        while (attrs.cols--) {
          cells.push(schema.nodes.table_cell.createAndFill())
        }

        const rows = []
        while (attrs.rows--) {
          rows.push(schema.nodes.table_row.createAndFill(null, cells))
        }

        const table = schema.nodes.table.createAndFill(null, rows)

        const tr = view.state.tr.replaceSelectionWith(table)
        tr.setSelection(Selection.near(tr.doc.resolve(from)))
        view.dispatch(tr.scrollIntoView())
        view.focus()
      }
    })
  }
})

const makeHeading = new DropdownSubmenu([1, 2, 3, 4, 5, 6].map(i => {
  return blockTypeItem(schema.nodes.heading, {
    title: 'Change to heading ' + i,
    label: 'Level ' + i,
    attrs: {
      level: i
    }
  })
}), {
  label: 'Heading'
})

const insertMenu = new Dropdown([
  insertImage,
  insertHorizontalRule,
  insertTable
], {
  label: 'Insert'
})

const typeMenu = new Dropdown([
  makeParagraph,
  makeCodeBlock,
  makeHeading
], {
  label: 'Type...'
})

const tableMenuItem = (label, cmd) => new MenuItem({
  label,
  select: cmd,
  run: cmd
})

const tableMenu = new Dropdown([
  tableMenuItem('Insert column before', addColumnBefore),
  tableMenuItem('Insert column after', addColumnAfter),
  tableMenuItem('Delete column', deleteColumn),
  tableMenuItem('Insert row before', addRowBefore),
  tableMenuItem('Insert row after', addRowAfter),
  tableMenuItem('Delete row', deleteRow),
  tableMenuItem('Delete table', deleteTable),
  tableMenuItem('Merge cells', mergeCells),
  tableMenuItem('Split cell', splitCell),
  tableMenuItem('Toggle header column', toggleHeaderColumn),
  tableMenuItem('Toggle header row', toggleHeaderRow),
  tableMenuItem('Toggle header cells', toggleHeaderCell)
], {
  label: 'Table'
})

export default [
  [
    toggleStrong,
    toggleEm,
    toggleCode,
    toggleSubscript,
    toggleSuperscript,
    toggleLink
  ],
  [
    insertMenu,
    typeMenu,
    tableMenu
  ],
  [
    undoItem,
    redoItem
  ],
  [
    wrapBulletList,
    wrapOrderedList,
    wrapBlockQuote,
    joinUpItem,
    liftItem
    // selectParentNodeItem
  ]
]
