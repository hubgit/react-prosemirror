import React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'

class Editor extends React.Component {
  componentDidMount () {
    const view = new EditorView(this.editor, {
      state: EditorState.create({
        schema: this.props.schema,
        doc: this.props.value,
        plugins: this.props.plugins
      }),
      dispatchTransaction: (transaction) => {
        const state = view.state.apply(transaction)
        view.updateState(state)
        this.props.onChange(state.doc.content)
      }
    })
  }

  componentWillReceiveProps (props) {
    // TODO: what should happen here?
  }

  render () {
    return <div ref={node => { this.editor = node }} />
  }
}

export default Editor
