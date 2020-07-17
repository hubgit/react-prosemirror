import { NodeViewCreator } from './types'

export const paragraphView: NodeViewCreator = (
  node,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  view,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decorations
) => {
  const dom = document.createElement('p')

  return {
    dom,
    contentDOM: dom,
    update: (newNode) => {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      dom.classList.toggle('empty-node', !newNode.content.size)

      node = newNode

      return true
    },
  }
}
