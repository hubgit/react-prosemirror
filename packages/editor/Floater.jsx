import React, { useContext, useMemo, useRef } from 'react';
import { EditorContext } from './EditorProvider';
export const Floater = ({ children }) => {
    const { view, state } = useContext(EditorContext);
    const floaterRef = useRef(null);
    const style = useMemo(() => {
        if (!floaterRef.current) {
            return { left: -1000, top: 0 };
        }
        const { selection } = state;
        if (!selection || selection.empty) {
            return { left: -1000, top: 0 };
        }
        const coords = view.coordsAtPos(selection.$anchor.pos);
        const { offsetWidth } = floaterRef.current;
        return {
            left: window.innerWidth - offsetWidth < coords.left
                ? coords.left - offsetWidth + 20
                : coords.left,
            top: coords.top + 30,
        };
    }, [state, view, floaterRef]);
    return (<div ref={floaterRef} className={'ProseMirror-floater'} style={style}>
      {children}
    </div>);
};
//# sourceMappingURL=Floater.jsx.map