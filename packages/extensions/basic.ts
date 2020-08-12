import { Extension, removeFormatting } from '@pompom/core'

export const basic: Extension<'doc' | 'text'> = {
  nodes: {
    doc: {
      content: '(block | heading)+',
      toDOM: () => ['article', 0],
    },
    text: {
      group: 'inline',
    },
  },
  actions: () => ({
    removeFormatting: {
      label: 'Remove',
      title: 'Remove formatting',
      enable: removeFormatting,
      run: removeFormatting,
    },
  }),
  // styles: ['prosemirror-view/style/prosemirror.css'],
}
