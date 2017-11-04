import React from 'react'
import classnames from 'classnames'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import baseClasses from 'prosemirror-view/style/prosemirror.css'
import classes from './Editor.css'

class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: EditorState.create(props.options)
    }
  }

  createEditorView = node => {
    this.view = new EditorView(node, {
      state: this.state.state,
      dispatchTransaction: this.dispatchTransaction,
      attributes: {
        class: classnames(
          baseClasses.ProseMirror,
          classes.ProseMirror,
          this.props.className
        )
      }
    })
  }

  dispatchTransaction = transaction => {
    const state = this.view.state.apply(transaction)
    this.view.updateState(state)
    this.setState({ state })
    this.props.onChange(state.doc.content)
  }

  render () {
    return this.props.render({
      state: this.state.state,
      dispatch: this.dispatchTransaction,
      editor: <div ref={this.createEditorView} />
    })
  }
}

export default Editor
