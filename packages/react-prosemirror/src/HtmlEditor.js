import React from 'react'
import debounce from 'lodash/debounce'
import { DOMParser, DOMSerializer } from 'prosemirror-model'

import Editor from './Editor'

const parser = schema => {
  const parser = DOMParser.fromSchema(schema)

  return content => {
    const container = document.createElement('article')
    container.innerHTML = content
    return parser.parse(container)
  }
}

const serializer = schema => {
  const serializer = DOMSerializer.fromSchema(schema)

  return content => {
    const container = document.createElement('article')
    container.appendChild(serializer.serializeFragment(content))
    return container.innerHTML
  }
}

class HtmlEditor extends React.Component {
  componentWillMount () {
    const { value, onChange, options } = this.props
    const { schema } = options

    const parse = parser(schema)
    const serialize = serializer(schema)

    options.doc = parse(value)

    this.onChange = debounce(value => {
      onChange(serialize(value))
    }, 1000, { maxWait: 5000 })
  }

  render () {
    const { options, menu } = this.props

    return (
      <Editor
        options={options}
        menu={menu}
        onChange={this.onChange}
      />
    )
  }
}

export default HtmlEditor
