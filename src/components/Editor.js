import React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'

class Editor extends React.Component {
  componentDidMount () {
    const { onChange, options } = this.props

    const view = new EditorView(this.editorNode, {
      state: EditorState.create(options),
      dispatchTransaction: transaction => {
        const state = view.state.apply(transaction)
        view.updateState(state)
        onChange(state.doc.content)
      }
    })
  }

  componentWillReceiveProps (props) {
    // TODO: what should happen here?
  }

  shouldComponentUpdate () {
    // never re-render
    return false
  }

  render () {
    return <div ref={node => { this.editorNode = node }} />
  }
}

export default Editor
