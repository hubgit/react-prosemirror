import { ToolbarItems } from '@pompom/react'

import { actions } from './actions'

export const toolbarItems: ToolbarItems = [
  {
    id: 'mark',
    items: [
      actions.toggleBold,
      actions.toggleItalic,
      actions.toggleSubscript,
      actions.toggleSuperscript,
      actions.toggleStrikethrough,
      actions.toggleUnderline,
      actions.removeFormatting,
    ],
  },
  {
    id: 'block',
    items: [actions.paragraphBlock, actions.headingBlock, actions.codeBlock],
  },
]

export const floatingToolbarItems: ToolbarItems = [
  {
    id: 'format',
    items: [
      actions.toggleBold,
      actions.toggleItalic,
      actions.toggleSubscript,
      actions.toggleSuperscript,
      actions.toggleStrikethrough,
      actions.toggleUnderline,
      actions.removeFormatting,
    ],
  },
]
