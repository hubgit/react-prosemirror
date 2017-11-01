// An example setup, adapted from prosemirror-example-setup

export { default as schema } from './schema'
export { default as plugins } from './plugins'
export { default as menu } from './menu'

// for tables
document.execCommand('enableObjectResizing', false, false)
document.execCommand('enableInlineTableEditing', false, false)
