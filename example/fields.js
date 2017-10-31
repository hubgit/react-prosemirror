class Field {
  constructor (options) {
    this.options = options
  }

  read (dom) {
    return dom.value
  }

  validateType (_value) {
  }

  validate (value) {
    if (!value && this.options.required) {
      return 'Required field'
    }

    return this.validateType(value) || (this.options.validate && this.options.validate(value))
  }

  clean (value) {
    return this.options.clean ? this.options.clean(value) : value
  }
}

export class TextField extends Field {
  render () {
    let input = document.createElement('input')
    input.type = 'text'
    input.placeholder = this.options.label
    input.value = this.options.value || ''
    input.autocomplete = 'off'

    return input
  }
}

export class SelectField extends Field {
  render () {
    let select = document.createElement('select')

    this.options.options.forEach(o => {
      let opt = select.appendChild(document.createElement('option'))
      opt.value = o.value
      opt.selected = o.value === this.options.value
      opt.label = o.label
    })

    return select
  }
}
