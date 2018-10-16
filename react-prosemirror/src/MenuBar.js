import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import classes from './MenuBar.module.css'

const Button = ({ state, dispatch }) => (item, key) => (
  <button
    key={key}
    type={'button'}
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

const MenuBar = ({ menu, children, view }) => (
  <div className={classes.bar}>
    {children && (
      <span className={classes.group}>
        {children}
      </span>
    )}

    {map(menu, (item, key) => (
      <span key={key} className={classes.group}>
        {map(item, Button(view))}
      </span>
    ))}
  </div>
)

export default MenuBar
