import { Node, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'

export class PomPom<S extends Schema = any> extends EventTarget {
  public view: EditorView<S>

  constructor(
    private schema: S,
    private plugins: Plugin<unknown, S>[],
    private editorProps: EditorProps<unknown, S>
  ) {
    super()

    const view = new EditorView<S>(undefined, {
      ...editorProps,
      state: EditorState.create({ schema, plugins }),
      dispatchTransaction: (tr) => {
        const { state, transactions } = view.state.applyTransaction(tr)

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

        view.updateState(state)
      },
    })

    this.view = view
  }

  public setDoc(doc: Node) {
    const state = EditorState.create({
      ...this.view.state,
      doc,
    })

    this.dispatchEvent(
      new CustomEvent('statechange', {
        detail: state,
      })
    )

    this.view.updateState(state)
  }
}
