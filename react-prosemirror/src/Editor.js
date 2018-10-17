import React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'
import './Editor.css'

class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.editorRef = React.createRef()

    const state = EditorState.create(props.options)

    this.view = new EditorView(null, {
      state,
      dispatchTransaction: transaction => {
        const state = this.view.state.apply(transaction)
        this.view.updateState(state)
        this.setState({ state })
        this.props.onChange(state.doc.content)
      },
      attributes: this.props.attributes
    })

    this.state = { state }
  }

  componentDidMount () {
    this.editorRef.current.appendChild(this.view.dom)

    if (this.props.autoFocus) {
      this.view.focus()
    }
  }

  render () {
    const editor = <div ref={this.editorRef} />

    return this.props.render ? this.props.render({
      editor,
      view: this.view
    }) : editor
  }
}

export default Editor
