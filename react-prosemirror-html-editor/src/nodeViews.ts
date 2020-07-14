import { Node } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'

type NodeViewCreator = (
  node: Node,
  view: EditorView,
  getPos: boolean | (() => number),
  decorations: Decoration[]
) => NodeView

export const paragraph: NodeViewCreator = (node, view, getPos, decorations) => {
  const contentDOM = document.createElement('p')

  return {
    contentDOM,
    update: (newNode, newDecorations) => {
      if (!node.sameMarkup(newNode)) {
        return false
      }

      contentDOM.classList.toggle('empty-node', !node.childCount)
      return true
    },
  }
}
