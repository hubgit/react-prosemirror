const prefix = 'ProseMirror-prompt'

const getValues = (fields, domFields) => {
  return fields.keys().reduce((output, key, index, fields) => {
    const field = fields[key]
    const dom = domFields[index]

    const value = field.read(dom)
    const bad = field.validate(value)

    if (bad) {
      reportInvalid(dom, bad)
      return null
    }

    output[key] = field.clean(value)

    return output
  }, {})
}

const reportInvalid = (dom, message) => {
  const parent = dom.parentNode

  const msg = parent.appendChild(document.createElement('div'))
  msg.style.left = (dom.offsetLeft + dom.offsetWidth + 2) + 'px'
  msg.style.top = (dom.offsetTop - 5) + 'px'
  msg.className = 'ProseMirror-invalid'
  msg.textContent = message

  setTimeout(() => parent.removeChild(msg), 1500)
}

export default options => {
  const wrapper = document.body.appendChild(document.createElement('div'))
  wrapper.className = prefix

  const mouseOutside = e => {
    if (!wrapper.contains(e.target)) {
      close()
    }
  }

  setTimeout(() => {
    window.addEventListener('mousedown', mouseOutside)
  }, 50)

  const close = () => {
    window.removeEventListener('mousedown', mouseOutside)
    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper)
  }

  const domFields = options.fields.map(field => field.render())

  let submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.className = prefix + '-submit'
  submitButton.textContent = 'OK'

  let cancelButton = document.createElement('button')
  cancelButton.type = 'button'
  cancelButton.className = prefix + '-cancel'
  cancelButton.textContent = 'Cancel'
  cancelButton.addEventListener('click', close)

  let form = wrapper.appendChild(document.createElement('form'))

  if (options.title) {
    form.appendChild(document.createElement('h5')).textContent = options.title
  }

  domFields.forEach(field => {
    form.appendChild(document.createElement('div')).appendChild(field)
  })

  const buttons = form.appendChild(document.createElement('div'))
  buttons.className = prefix + '-buttons'
  buttons.appendChild(submitButton)
  buttons.appendChild(document.createTextNode(' '))
  buttons.appendChild(cancelButton)

  const box = wrapper.getBoundingClientRect()
  wrapper.style.top = ((window.innerHeight - box.height) / 2) + 'px'
  wrapper.style.left = ((window.innerWidth - box.width) / 2) + 'px'

  const submit = () => {
    const params = getValues(options.fields, domFields)
    if (params) {
      close()
      options.callback(params)
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    submit()
  })

  form.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 27:
        e.preventDefault()
        close()
        break

      case 13:
        if (!(e.ctrlKey || e.metaKey || e.shiftKey)) {
          e.preventDefault()
          submit()
        }
        break

      case 9:
        window.setTimeout(() => {
          if (!wrapper.contains(document.activeElement)) {
            close()
          }
        }, 500)
        break
    }
  })

  if (form.elements.length) {
    form.elements[0].focus()
  }
}
