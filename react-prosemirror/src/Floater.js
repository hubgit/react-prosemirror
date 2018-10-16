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
    this.calculateStyle(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.calculateStyle(nextProps)
  }

  render () {
    return (
      <div ref={this.menuRef} className={classes.floater} style={this.state.style}>
        {this.props.children}
      </div>
    )
  }

  calculateStyle (props) {
    const { view } = this.props

    const coords = view.coordsAtPos(view.state.selection.$anchor.pos)

    const { offsetWidth } = this.menuRef.current

    this.setState({
      style: {
        left: window.innerWidth - offsetWidth < coords.left ? coords.left - offsetWidth + 20 : coords.left,
        top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 20
      }
    })
  }
}

export default Floater
