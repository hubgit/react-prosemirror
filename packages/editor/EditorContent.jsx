import React, { useCallback, useContext } from 'react';
import { EditorContext } from './EditorProvider';
export const EditorContent = ({ autoFocus = false, }) => {
    const { view } = useContext(EditorContext);
    const editorRef = useCallback((container) => {
        if (container) {
            container.appendChild(view.dom);
            if (autoFocus) {
                view.focus();
            }
        }
    }, [view, autoFocus]);
    return <div className={'ProseMirror-content'} ref={editorRef}/>;
};
//# sourceMappingURL=EditorContent.jsx.map