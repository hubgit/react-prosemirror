import { Node } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'

export type NodeViewCreator = (
  node: Node,
  view: EditorView,
  getPos: boolean | (() => number),
  decorations: Decoration[]
) => NodeView
