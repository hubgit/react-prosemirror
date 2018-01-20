export default {
  footnote: {
    group: 'inline',
    content: 'inline*',
    inline: true,
    draggable: true,
    atom: true,
    toDOM: () => ['prosemirror-footnote', 0],
    parseDOM: [
      { tag: 'prosemirror-footnote' }
    ]
  }
}
