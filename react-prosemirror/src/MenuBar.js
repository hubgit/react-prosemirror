import React from "react";
import map from "lodash/map";
import classnames from "classnames";
import classes from "./MenuBar.module.css";

const Button = (state, dispatch) => (item, key) => (
  <button
    key={key}
    type="button"
    className={classnames({
      [classes.button]: true,
      [classes.active]: item.active && item.active(state)
    })}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault();
      item.run(state, dispatch);
    }}
  >
    {item.content}
  </button>
);

class MenuBar extends React.Component {
  render () {
    let {
      menu,
      children,
      state,
      dispatch,
      view,
      floating,
      className,
      styles
    } = this.props

    if (floating) {
      styles = { ...styles };
      if (view) {
        if (state.selection.$anchor.pos !== state.selection.$head.pos) {
          const coords = view.coordsAtPos(state.selection.$anchor.pos);

          styles.height = "auto";
          styles.padding = "3px";
          // Avoid rendering menu out of window when cursor is at the top
          styles.top = (coords.top - 40 > 0 ? coords.top - 40 : coords.top + 20);
          // Avoid rendering menu past right window
          styles.left = ((window.innerWidth - this.menu.offsetWidth) < coords.left) ? (coords.left - this.menu.offsetWidth) + 20 : coords.left;
        }
      }
    }
    return (
      <div
        ref={node => this.menu = node}
        className={classnames(classes.bar, floating ? classes.floating : '', className)}
        style={styles}
      >
        {children && <span className={classes.group}>{children}</span>}

        {map(menu, (item, key) => (
          <span key={key} className={classes.group}>
            {map(item, Button(state, dispatch))}
          </span>
        ))}
      </div>
    );
  }
}

export default MenuBar;
