import { StepMap } from 'prosemirror-transform'
import { keymap } from 'prosemirror-keymap'
import { undo, redo } from 'prosemirror-history'
import { EditorView } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'

class FootnoteView {
  constructor (node, view, getPos) {
    this.node = node
    this.outerView = view
    this.getPos = getPos

    this.dom = document.createElement('prosemirror-footnote')
    this.innerView = null
  }

  selectNode () {
    this.dom.classList.add('ProseMirror-selectednode')

    if (!this.innerView) {
      this.open()
    }
  }

  deselectNode () {
    this.dom.classList.remove('ProseMirror-selectednode')

    if (this.innerView) {
      this.close()
    }
  }

  open () {
    const tooltip = this.dom.appendChild(document.createElement('div'))
    tooltip.className = 'footnote-tooltip'

    this.innerView = new EditorView(tooltip, {
      state: EditorState.create({
        doc: this.node,
        plugins: [
          keymap({
            'Mod-z': () => undo(this.outerView.state, this.outerView.dispatch),
            'Mod-y': () => redo(this.outerView.state, this.outerView.dispatch)
          })
        ]
      }),
      dispatchTransaction: this.dispatchInner.bind(this),
      handleDOMEvents: {
        mousedown: () => {
          if (this.outerView.hasFocus()) {
            this.innerView.focus()
          }
        }
      }
    })

    this.innerView.focus()
  }

  close () {
    this.innerView.destroy()
    this.innerView = null
    this.dom.textContent = ''
  }

  dispatchInner (tr) {
    const { state, transactions } = this.innerView.state.applyTransaction(tr)

    this.innerView.updateState(state)

    if (!tr.getMeta('fromOutside')) {
      const outerTr = this.outerView.state.tr
      const offsetMap = StepMap.offset(this.getPos() + 1)

      transactions.forEach(transaction => {
        transaction.steps.forEach(step => {
          outerTr.step(step.map(offsetMap))
        })
      })

      if (outerTr.docChanged) {
        this.outerView.dispatch(outerTr)
      }
    }
  }

  update (node) {
    if (!node.sameMarkup(this.node)) {
      return false
    }

    this.node = node

    if (this.innerView) {
      const state = this.innerView.state
      const start = node.content.findDiffStart(state.doc.content)

      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content)

        const overlap = start - Math.min(endA, endB)

        if (overlap > 0) {
          endA += overlap
          endB += overlap
        }

        this.innerView.dispatch(
          state.tr
            .replace(start, endB, node.slice(start, endA))
            .setMeta('fromOutside', true)
        )
      }
    }

    return true
  }

  destroy () {
    if (this.innerView) {
      this.close()
    }
  }

  stopEvent (event) {
    return this.innerView && this.innerView.dom.contains(event.target)
  }

  ignoreMutation () {
    return true
  }
}

export default FootnoteView
