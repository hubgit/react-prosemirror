import 'highlight.js/styles/default.css'

import { NodeViewCreator } from '@pompom/core'
import * as hljs from 'highlight.js'
import { Node, Schema } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'

const languages = new Map<string, string>([
  ['javascript', 'javascript'],
  ['css', 'css'],
  ['html', 'xml'],
  ['xml', 'xml'],
])

const importRequirements = async (language: string) => {
  const requirement = languages.get(language) as string

  if (!hljs.getLanguage(requirement)) {
    const highlighter = await import(
      `highlight.js/lib/languages/${requirement}`
    )
    hljs.registerLanguage(requirement, highlighter)
  }
}

export const codeBlockView: NodeViewCreator = <S extends Schema>(
  node: Node<S>,
  view: EditorView<S>,
  getPos: (() => number) | boolean
) => {
  const dom = document.createElement('pre')
  dom.className = 'pompom-code'

  const renderOptions = (value: string) => {
    const select = document.createElement('select')

    for (const language of languages.keys()) {
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

  importRequirements(language)
    .then(() => {
      renderOptions(language)
      highlightContent()
    })
    .catch(() => {
      console.error(`Couldn't import ${language} requirements`)
    })

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
