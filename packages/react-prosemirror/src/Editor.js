import React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import decorations from './decorations'
import 'prosemirror-view/style/prosemirror.css'
import './Editor.css'

class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: EditorState.create(props.options)
    }
  }

  createEditorView = node => {
    if (!this.view) {
      this.view = new EditorView(node, {
        state: this.state.state,
        dispatchTransaction: this.dispatchTransaction,
        decorations: decorations(this.props)
      })

      if (this.props.autoFocus) {
        this.view.focus()
      }
    }
  }

  dispatchTransaction = transaction => {
    const state = this.view.state.apply(transaction)
    this.view.updateState(state)
    this.setState({ state })
    this.props.onChange(state.doc.content)
  }

  render () {
    const editor = <div ref={this.createEditorView} />

    return this.props.render ? this.props.render({
      state: this.state.state,
      dispatch: this.dispatchTransaction,
      editor
    }) : editor
  }
}

export default Editor
