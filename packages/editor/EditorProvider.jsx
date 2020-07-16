import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { createContext, useEffect, useMemo, useState, } from 'react';
// @ts-ignore
export const EditorContext = createContext(undefined);
export const EditorProvider = ({ children, debounce = 500, editorProps, handleChange, plugins, schema, transformer, value, }) => {
    // debounce the output transformation if required
    const debouncedHandleChange = useMemo(() => {
        let timer;
        return (outputNode) => {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                handleChange(transformer.export(outputNode));
            }, debounce);
        };
    }, [debounce, handleChange, transformer]);
    const view = useMemo(() => {
        return new EditorView(undefined, Object.assign({ state: EditorState.create({ plugins, schema }), dispatchTransaction: (tr) => {
                const { state, transactions } = view.state.applyTransaction(tr);
                view.updateState(state);
                setState(state);
                if (transactions.some((tr) => tr.docChanged)) {
                    debouncedHandleChange(state.doc);
                }
            } }, editorProps));
    }, [debouncedHandleChange, editorProps, plugins, schema]);
    const [state, setState] = useState(view.state);
    useEffect(() => {
        view.updateState(EditorState.create({
            doc: transformer.import(value),
            plugins: view.state.plugins,
            schema: view.state.schema,
        }));
    }, [transformer, value, view]);
    return (<div className={'ProseMirror-container'}>
      <EditorContext.Provider value={{ view, state }}>
        {children}
      </EditorContext.Provider>
    </div>);
};
//# sourceMappingURL=EditorProvider.jsx.map