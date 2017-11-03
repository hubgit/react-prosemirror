import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import classes from './MenuBar.css'

const Separator = () => (
  <span className={classes.separator} />
)

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

  const keys = Object.keys(menu)
  const limit = keys.length - 1

  return (
    <div className={classes.bar}>
      {keys.map((key, index) => (
        <span key={key}>
          {map(menu[key], Button)}
          {index < limit && <Separator />}
        </span>
      ))}
    </div>
  )
}

export default MenuBar
