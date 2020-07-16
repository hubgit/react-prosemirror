import React, { useContext } from 'react';
import { EditorContext } from './';
export const Toolbar = ({ children }) => (<div className={'ProseMirror-toolbar'}>{children}</div>);
export const ToolbarGroup = ({ children }) => (<div className={'ProseMirror-toolbar-group'}>{children}</div>);
// TODO: press button with keyboard
export const ToolbarItem = ({ active, children, enable, title, run }) => {
    const { view } = useContext(EditorContext);
    return (<button type={'button'} className={'ProseMirror-toolbar-item'} data-active={active && active(view.state)} disabled={enable && !enable(view.state)} title={title} onMouseDown={(event) => {
        event.preventDefault();
        run(view.state, view.dispatch, view, event.nativeEvent);
    }}>
      {children}
    </button>);
};
//# sourceMappingURL=Toolbar.jsx.map