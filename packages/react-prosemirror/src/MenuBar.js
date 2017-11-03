import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import classes from './MenuBar.css'

const MenuBar = ({ menu, state, dispatch }) => {
  const Button = (item, key) => (
    <button
      key={key}
      className={classnames({
        [classes.button]: true,
        [classes.active]: item.active && item.active(state)
      })}
      title={item.title}
      disabled={item.enable && !item.enable(state)}
      onMouseDown={e => {
        e.preventDefault()
        item.run(state, dispatch)
      }}
    >{item.content}</button>
  )

  return (
    <div className={classes.bar}>
      {Object.keys(menu).map((key, index) => (
        <span key={key} className={classes.group}>
          {map(menu[key], Button)}
        </span>
      ))}
    </div>
  )
}

export default MenuBar
