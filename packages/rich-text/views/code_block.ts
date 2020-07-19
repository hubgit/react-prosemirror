import 'highlight.js/styles/default.css'

import hljs from 'highlight.js'
import { Node, Schema } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'

import { NodeViewCreator } from './types'

const languages = ['javascript', 'css', 'html']

import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)

export const codeBlockView: NodeViewCreator = <S extends Schema>(
  node: Node<S>,
  view: EditorView<S>,
  getPos: (() => number) | boolean
) => {
  const dom = document.createElement('pre')
  dom.className = 'pompom-code'

  const renderOptions = (value: string) => {
    const select = document.createElement('select')

    for (const language of languages) {
      const option = document.createElement('option')
      option.setAttribute('value', language)
      option.textContent = language
      option.selected = language === value
      select.appendChild(option)
    }

    if (typeof getPos === 'function') {
      select.addEventListener('change', (event) => {
        if (event.target) {
          const language = (event.target as HTMLSelectElement).value as string

          view.dispatch(
            view.state.tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              language,
            })
          )
        }
      })
    }

    const selectContainer = document.createElement('div')
    selectContainer.appendChild(select)

    dom.appendChild(selectContainer)
  }

  const contentDOM = document.createElement('code')
  dom.appendChild(contentDOM)

  const highlightDOM = document.createElement('code')
  dom.appendChild(highlightDOM)

  const highlightContent = () => {
    highlightDOM.textContent = contentDOM.textContent
    hljs.highlightBlock(highlightDOM)
  }

  const { language } = node.attrs

  highlightDOM.className = `pompom-code-highlight language-${language}`

  /*  if (!hljs.getLanguage(language)) {
    const highlighter = await import(`highlight.js/lib/languages/${language}`)
    hljs.registerLanguage(language, highlighter)
  }*/

  renderOptions(language)

  highlightContent()

  return {
    dom,
    contentDOM,
    update: (newNode: Node<S>) => {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      highlightContent()

      node = newNode

      return true
    },
  }
}
