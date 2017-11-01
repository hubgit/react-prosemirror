import React from 'react'
import classnames from 'classnames'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import baseClasses from 'prosemirror-view/style/prosemirror.css'
import classes from './Editor.css'
import MenuBar from './MenuBar'

class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: EditorState.create(props.options)
    }
  }

  componentWillReceiveProps (props) {
    // TODO: what should happen here?
  }

  createEditorView = node => {
    const { state } = this.state

    this.view = new EditorView(node, {
      state,
      dispatchTransaction: this.dispatchTransaction,
      attributes: {
        class: classnames(baseClasses.ProseMirror, classes.ProseMirror)
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
    const { options: { menu } } = this.props
    const { state } = this.state

    return (
      <div>
        {menu && (
          <MenuBar
            menu={menu}
            state={state}
            dispatch={this.dispatchTransaction}
          />
        )}

        <div
          ref={this.createEditorView}
        />
      </div>
    )
  }
}

export default Editor
