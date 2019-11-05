import React from 'react'
import classes from './Floater.module.css'

class Floater extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      style: {
        left: 0,
        top: 0
      }
    }

    this.menuRef = React.createRef()
  }

  componentDidMount () {
    this.setStyle(this.props)
    ['resize', 'scroll'].forEach(evt => {
      window.addEventListener(evt, this.updateStyle)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setStyle(nextProps)
  }

  componentWillUnmount () {
    ['resize', 'scroll'].forEach(evt => {
      window.removeEventListener(evt, this.updateStyle)
    })
  }

  render () {
    return (
      <div ref={this.menuRef} className={classes.floater} style={this.state.style}>
        {this.props.children}
      </div>
    )
  }

  calculateStyle (props) {
    const { view } = props

    const { selection } = view.state

    if (!selection || selection.empty) {
      return {
        left: -1000,
        top: 0
      }
    }

    const coords = view.coordsAtPos(selection.$anchor.pos)

    const { offsetWidth } = this.menuRef.current

    return {
      left: window.innerWidth - offsetWidth < coords.left ? coords.left - offsetWidth + 20 : coords.left,
      top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 20
    }
  }

  setStyle = (props) => {
    this.setState({
      style: this.calculateStyle(props)
    })
  }

  updateStyle = () => {
    this.setStyle(this.props)
  }
}

export default Floater
