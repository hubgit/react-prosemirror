import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import classes from './MenuBar.css'

const Separator = () => (
  <span className={classes.separator} />
)

const MenuBar = ({ menu, state, dispatch }) => {
  const handle = cmd => e => {
    e.preventDefault()
    cmd(state, dispatch)
  }

  const Button = (item, key) => {
    const disabled = item.enable && !item.enable(state)
    // if (item.active && disabled) return null

    const active = item.active && item.active(state)
    // if (item.active && !active) return null

    return (
      <button
        key={key}
        className={classnames({
          [classes.button]: true,
          [classes.active]: active
        })}
        title={item.title}
        disabled={disabled}
        onMouseDown={handle(item.run)}
      >{item.content}</button>
    )
  }

  return (
    <div className={classes.bar}>
      {map(menu.marks, Button)}
      <Separator />
      {map(menu.blocks, Button)}
      <Separator />
      {map(menu.insert, Button)}
      <Separator />
      {map(menu.history, Button)}
      <Separator />
      {map(menu.table, Button)}
    </div>
  )
}

export default MenuBar
