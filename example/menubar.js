function separator () {
  const separator = document.createElement('span')
  separator.className = 'ProseMirror-menuseparator'
  return separator
}

function combineUpdates (updates, nodes) {
  return state => {
    let something = false
    for (let i = 0; i < updates.length; i++) {
      let up = updates[i](state)
      nodes[i].style.display = up ? '' : 'none'
      if (up) something = true
    }
    return something
  }
}

function renderGrouped (view, content) {
  let result = document.createDocumentFragment()
  let updates = []
  let separators = []
  for (let i = 0; i < content.length; i++) {
    let items = content[i]
    let localUpdates = []
    let localNodes = []
    for (let j = 0; j < items.length; j++) {
      let { dom, update } = items[j].render(view)
      const span = document.createElement('span')
      span.className = 'ProseMirror-menuitem'
      span.appendChild(dom)
      result.appendChild(span)
      localNodes.push(span)
      localUpdates.push(update)
    }
    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes))
      if (i < content.length - 1) {
        separators.push(result.appendChild(separator()))
      }
    }
  }

  function update (state) {
    let something = false
    let needSep = false
    for (let i = 0; i < updates.length; i++) {
      let hasContent = updates[i](state)
      if (i) {
        separators[i - 1].style.display = needSep && hasContent ? '' : 'none'
      }
      needSep = hasContent
      if (hasContent) something = true
    }
    return something
  }

  return { dom: result, update }
}

export class MenuBarView {
  constructor (editorView, menu) {
    this.editorView = editorView

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'ProseMirror-menubarwrapper'

    this.menu = document.createElement('div')
    this.menu.className = 'ProseMirror-menubar'

    this.wrapper.appendChild(this.menu)

    editorView.dom.parentNode.replaceChild(this.wrapper, editorView.dom)
    this.wrapper.appendChild(editorView.dom)

    this.maxHeight = 0
    this.widthForMaxHeight = 0

    let { dom, update } = renderGrouped(this.editorView, menu)
    this.contentUpdate = update
    this.menu.appendChild(dom)
    this.update()
  }

  update () {
    this.contentUpdate(this.editorView.state)

    if (this.menu.offsetWidth !== this.widthForMaxHeight) {
      this.widthForMaxHeight = this.menu.offsetWidth
      this.maxHeight = 0
    }

    if (this.menu.offsetHeight > this.maxHeight) {
      this.maxHeight = this.menu.offsetHeight
      this.menu.style.minHeight = this.maxHeight + 'px'
    }
  }
}
