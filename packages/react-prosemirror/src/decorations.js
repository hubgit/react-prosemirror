import { DecorationSet, Decoration } from 'prosemirror-view'

const isEmpty = doc => (
  doc.childCount === 1 &&
  doc.firstChild.isTextblock &&
  doc.firstChild.content.size === 0
)

const placeholder = content => {
  const container = document.createElement('div')
  container.textContent = content
  container.classList.add('placeholder')

  return Decoration.widget(1, container)
}

export default props => state => {
  const decorations = []

  if (props.placeholder && isEmpty(state.doc)) {
    decorations.push(placeholder(props.placeholder))
  }

  return DecorationSet.create(state.doc, decorations)
}
