import { Node, Schema } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'

export type NodeViewCreator = <S extends Schema>(
  node: Node<S>,
  view: EditorView<S>,
  getPos: boolean | (() => number),
  decorations: Decoration[]
) => NodeView<S>
