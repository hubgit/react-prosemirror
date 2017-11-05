// An example setup, adapted from prosemirror-example-setup

import schema from './schema'
import plugins from './plugins'

import 'prosemirror-tables/style/tables.css'
import 'prosemirror-gapcursor/style/gapcursor.css'

// for tables
document.execCommand('enableObjectResizing', false, false)
document.execCommand('enableInlineTableEditing', false, false)

export const options = {
  plugins,
  schema
}

export { default as menu } from './menu'
