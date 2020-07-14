import { NodeViewCreator } from './types'

export const paragraphView: NodeViewCreator = (
  node,
  view,
  getPos,
  decorations
) => {
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
