import { Node, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'

export class Editor<S extends Schema = any> extends EventTarget {
  public view: EditorView<S>

  constructor(
    schema: S,
    plugins: Plugin<unknown, S>[],
    editorProps: EditorProps<unknown, S>
  ) {
    super()

    const view = new EditorView<S>(undefined, {
      ...editorProps,
      state: EditorState.create({ schema, plugins }),
      dispatchTransaction: (tr) => {
        const { state, transactions } = view.state.applyTransaction(tr)

        view.updateState(state)

        this.dispatchEvent(
          new CustomEvent('statechange', {
            detail: state,
          })
        )

        if (transactions.some((tr) => tr.docChanged)) {
          this.dispatchEvent(
            new CustomEvent('docchange', {
              detail: state.doc,
            })
          )
        }
      },
    })

    this.view = view
  }

  public setDoc(doc: Node) {
    const state = EditorState.create({
      ...this.view.state,
      doc,
    })

    this.view.updateState(state)

    this.dispatchEvent(
      new CustomEvent('statechange', {
        detail: state,
      })
    )
  }
}
