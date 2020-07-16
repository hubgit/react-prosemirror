import { createHtmlTransformer, EditorContent, EditorProvider, } from '@pompom/core';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import React, { useMemo } from 'react';
import { MainToolbar } from './components';
import { keys, rules } from './plugins';
import { createSchema } from './schema';
import { paragraphView } from './views';
const schema = createSchema();
const plugins = [
    history(),
    keys(schema),
    keymap(baseKeymap),
    rules(schema),
];
const transformer = createHtmlTransformer(schema);
export const HTMLEditor = React.memo(({ autoFocus = false, handleBlur, handleChange, handleFocus, value = '', }) => {
    const editorProps = useMemo(() => ({
        handleDOMEvents: {
            blur: (view, event) => {
                handleBlur && handleBlur(event);
                return false;
            },
            focus: (view, event) => {
                handleFocus && handleFocus(event);
                return false;
            },
        },
        nodeViews: {
            paragraph: paragraphView,
        },
        scrollMargin: 16,
        scrollThreshold: 16,
    }), [handleBlur, handleFocus]);
    return (<EditorProvider editorProps={editorProps} handleChange={handleChange} plugins={plugins} schema={schema} transformer={transformer} value={value}>
        <MainToolbar schema={schema}/>
        <EditorContent autoFocus={autoFocus}/>
      </EditorProvider>);
});
//# sourceMappingURL=HTMLEditor.jsx.map