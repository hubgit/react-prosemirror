import './style/footnotes.css'

import { redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { StepMap } from 'prosemirror-transform'
import { EditorView, NodeView } from 'prosemirror-view'

export const footnoteView = (
  node: ProsemirrorNode,
  view: EditorView,
  getPos: () => number
): NodeView => {
  const dom = document.createElement('prosemirror-footnote')

  let innerView: EditorView | null

  const open = () => {
    const tooltip = dom.appendChild(document.createElement('div'))
    tooltip.className = 'footnote-tooltip'

    innerView = new EditorView(tooltip, {
      state: EditorState.create({
        doc: node,
        plugins: [
          keymap({
            // eslint-disable-next-line @typescript-eslint/unbound-method
            'Mod-z': () => undo(view.state, view.dispatch),
            // eslint-disable-next-line @typescript-eslint/unbound-method
            'Mod-y': () => redo(view.state, view.dispatch),
          }),
        ],
      }),
      dispatchTransaction: function (tr: Transaction) {
        const { state, transactions } = this.state.applyTransaction(tr)

        this.updateState(state)

        if (!tr.getMeta('fromOutside')) {
          const outerTr = view.state.tr
          const offsetMap = StepMap.offset(getPos() + 1)

          transactions.forEach((transaction) => {
            transaction.steps.forEach((step) => {
              const newStep = step.map(offsetMap)
              if (newStep) {
                outerTr.step(newStep)
              }
            })
          })

          if (outerTr.docChanged) {
            view.dispatch(outerTr)
          }
        }
      },
      handleDOMEvents: {
        mousedown: () => {
          if (innerView && view.hasFocus()) {
            innerView.focus()
          }
          return false
        },
      },
    })

    innerView.focus()
  }

  const close = () => {
    if (innerView) {
      innerView.destroy()
      innerView = null
    }
    dom.textContent = ''
  }

  return {
    selectNode() {
      dom.classList.add('ProseMirror-selectednode')

      if (!innerView) {
        open()
      }
    },
    deselectNode() {
      dom.classList.remove('ProseMirror-selectednode')

      if (innerView) {
        close()
      }
    },
    update(newNode) {
      if (!newNode.sameMarkup(node)) {
        return false
      }

      node = newNode

      if (innerView) {
        const { state } = innerView
        const start = node.content.findDiffStart(state.doc.content)

        if (start != null) {
          // @ts-ignore
          let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content)

          const overlap = start - Math.min(endA, endB)

          if (overlap > 0) {
            endA += overlap
            endB += overlap
          }

          innerView.dispatch(
            state.tr
              .replace(start, endB, node.slice(start, endA))
              .setMeta('fromOutside', true)
          )
        }
      }

      return true
    },
    destroy() {
      if (innerView) {
        close()
      }
    },
    stopEvent(event) {
      return Boolean(innerView && innerView.dom.contains(event.target as Node))
    },
    ignoreMutation() {
      return true
    },
  }
}
