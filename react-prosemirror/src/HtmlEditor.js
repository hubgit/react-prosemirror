import React from 'react'
import debounce from 'lodash/debounce'
import { DOMParser, DOMSerializer } from 'prosemirror-model'

import Editor from './Editor'

class HtmlEditor extends React.Component {

  constructor (props) {
    super(props)

    this.editorRef = React.createRef()
  }

  get view() {
    if (!this.editorRef || !this.editorRef.current) {
      return null;
    }
    return this.editorRef.current.view;
  }

  initializeParse(schema) {
    const parser = DOMParser.fromSchema(schema)
  
    return content => {
      const container = document.createElement('article')
      container.innerHTML = content
  
      return parser.parse(container)
    }
  }
  
  initializeSerialize(schema) {
    const serializer = DOMSerializer.fromSchema(schema)
  
    return doc => {
      const container = document.createElement('article')
      container.appendChild(serializer.serializeFragment(doc.content))
  
      return container.innerHTML
    }
  }

  componentWillMount () {
    const { value, onChange, options } = this.props
    const { schema } = options

    const parse = this.initializeParse(schema)
    const serialize = this.initializeSerialize(schema)

    options.doc = parse(value)

    this.onChange = debounce(doc => {
      onChange(serialize(doc))
    }, 1000, { maxWait: 5000 })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, options } = this.props
    const { schema } = options

    if (nextProps.value !== value) {
      const parse = this.initializeParse(schema)
      this.view.state.doc = parse(value)
      this.view.updateState(this.view.state);
    }
  }

  render () {
    const { autoFocus, options, attributes, render, nodeViews } = this.props

    return (
      <Editor
        ref={this.editorRef}
        autoFocus={autoFocus}
        options={options}
        attributes={attributes}
        render={render}
        onChange={this.onChange}
        nodeViews={nodeViews}
      />
    )
  }
}

export default HtmlEditor
