import 'highlight.js/styles/default.css'

import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'

import { NodeViewCreator } from './types'

hljs.registerLanguage('javascript', javascript)

export const codeBlockView: NodeViewCreator = (
  node,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  view,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decorations
) => {
  const dom = document.createElement('pre')

  const contentDOM = document.createElement('code')
  contentDOM.className = 'language-js'
  dom.appendChild(contentDOM)

  const handleUpdate = () => {
    hljs.highlightBlock(contentDOM)
  }

  handleUpdate()

  return {
    dom,
    contentDOM,
    update: (newNode) => {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      handleUpdate()

      node = newNode

      return true
    },
  }
}
