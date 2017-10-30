import React from 'react'
import debounce from 'lodash/debounce'
import { DOMParser, DOMSerializer } from 'prosemirror-model'

import Editor from './Editor'

class HtmlEditor extends React.Component {
  parse (content) {
    const container = document.createElement('article')
    container.innerHTML = content
    return this.parser.parse(container)
  }

  serialize (content) {
    const container = document.createElement('article')
    container.appendChild(this.serializer.serializeFragment(content))
    return container.innerHTML
  }

  componentWillMount () {
    const { schema, value, onChange, ...options } = this.props

    this.parser = DOMParser.fromSchema(schema)
    this.serializer = DOMSerializer.fromSchema(schema)

    this.setState({
      ...options,
      doc: this.parse(value),
      onChange: debounce(value => {
        onChange(this.serialize(value))
      }, 1000, { maxWait: 5000 })
    })
  }

  componentWillReceiveProps (props) {
    // TODO: what should happen here?
  }

  render () {
    return <Editor {...this.state} />
  }
}

export default HtmlEditor
