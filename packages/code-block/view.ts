import 'highlight.js/styles/default.css'

import hljs from 'highlight.js'
import { Node, Schema } from 'prosemirror-model'
import { EditorView, NodeView } from 'prosemirror-view'

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

export class CodeBlockView<S extends Schema> implements NodeView<S> {
  private readonly highlightDOM: HTMLElement

  public contentDOM: HTMLElement
  public dom: HTMLPreElement
  // public ignoreMutation = () => true

  constructor(
    protected node: Node<S>,
    protected view: EditorView<S>,
    protected getPos: () => number
  ) {
    this.dom = document.createElement('pre')
    this.dom.className = 'pompom-code'

    this.contentDOM = document.createElement('code')
    this.dom.appendChild(this.contentDOM)

    this.highlightDOM = document.createElement('code')
    this.highlightDOM.setAttribute('contenteditable', 'false')
    this.dom.appendChild(this.highlightDOM)

    this.setLanguage(this.node.attrs.language).catch(() => {
      console.error(`Couldn't import language requirements`)
    })
  }

  public update = (newNode: Node<S>): boolean => {
    if (!newNode.sameMarkup(this.node)) {
      return false
    }

    this.highlightContent()

    this.node = newNode

    return true
  }

  private setLanguage = async (language: string) => {
    await importRequirements(language)

    this.renderOptions(language)

    this.highlightDOM.className = `pompom-code-highlight language-${language}`

    this.highlightContent()
  }

  private highlightContent = () => {
    this.highlightDOM.textContent = this.contentDOM.textContent
    hljs.highlightBlock(this.highlightDOM)
  }

  private renderOptions = (value: string) => {
    const select = document.createElement('select')

    for (const language of languages.keys()) {
      const option = document.createElement('option')
      option.setAttribute('value', language)
      option.textContent = language
      option.selected = language === value
      select.appendChild(option)
    }

    select.addEventListener('change', (event) => {
      if (event.target) {
        const language = (event.target as HTMLSelectElement).value

        this.view.dispatch(
          this.view.state.tr.setNodeMarkup(this.getPos(), undefined, {
            ...this.node.attrs,
            language,
          })
        )
      }
    })

    const selectContainer = document.createElement('div')
    selectContainer.appendChild(select)

    this.dom.appendChild(selectContainer)
  }
}
