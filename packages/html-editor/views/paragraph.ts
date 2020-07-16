import { NodeViewCreator } from './types'

export const paragraphView: NodeViewCreator = (
  node,
  view,
  getPos,
  decorations
) => {
  const dom = document.createElement('p')

  return {
    dom,
    contentDOM: dom,
    update: (newNode, newDecorations) => {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      dom.classList.toggle('empty-node', !newNode.content.size)

      node = newNode

      return true
    },
  }
}
