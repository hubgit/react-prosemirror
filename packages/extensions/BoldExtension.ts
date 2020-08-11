import { Action, toggleMarkAction } from '@pompom/commands'
import { Extension } from '@pompom/core'
import { keymap } from 'prosemirror-keymap'
import { MarkSpec, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'

export class BoldExtension extends Extension {
  public marks = (): Record<string, MarkSpec> => ({
    bold: {
      parseDOM: [
        { tag: 'strong' },
        { tag: 'b' },
        { style: 'font-weight=bold' }, // TODO: font-weight > 400
      ],
      toDOM: () => ['strong', 0],
    },
  })

  public actions = <S extends Schema>(
    schema: S
  ): Record<'toggleBold', Action<S>> => ({
    toggleBold: toggleMarkAction<S>(schema.marks.bold, 'Bold'),
  })

  public plugins = <S extends Schema>(
    schema: S,
    actions: Record<string, Action<S>>
  ): Plugin<S>[] => {
    return [
      keymap({
        'Mod-b': actions.toggleBold.run,
      }),
    ]
  }
}
