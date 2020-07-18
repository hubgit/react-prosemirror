import { Node, Schema } from 'prosemirror-model'

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

  const handleUpdate = (newNode: Node) => {
    dom.classList.toggle('empty-node', !newNode.content.size)
  }

  handleUpdate(node)

  return {
    dom,
    contentDOM: dom,
    update: (newNode) => {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      handleUpdate(newNode)

      node = newNode

      return true
    },
  }
}
