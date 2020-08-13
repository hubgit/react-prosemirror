import { baseKeymap, Command } from 'prosemirror-commands'
import { InputRule, inputRules } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { MarkSpec, Node, NodeSpec, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { Action, Extension, NodeViewCreator, Transformer } from './types'

interface Options<T, N extends string = any, M extends string = any> {
  debounce?: number
  extensions: Extension<N, M>[]
  handleChange?: (value: T) => void
  handleStateChange?: (state: EditorState<Schema<N, M>>) => void
  transformer: { new (schema: Schema): Transformer<T, Schema<N, M>> }
}

export class PomPom<T, N extends string = any, M extends string = any> {
  public schema: Schema<N, M>
  public actions: Record<string, Action<N, M>>
  public inputRules: Record<string, InputRule>
  public keys: Record<string, Command<Schema<N, M>>>
  public marks: Record<M, MarkSpec>
  public nodes: Record<N, NodeSpec>
  public nodeViews: Record<N | M, NodeViewCreator<Schema<N, M>>>
  public plugins: Record<string, Plugin>
  public debounce: number
  public handleStateChange?: (state: EditorState<Schema<N, M>>) => void
  public view: EditorView<Schema<N, M>>
  public transformer: Transformer<T, Schema<N, M>>

  constructor({
    debounce = 500,
    extensions = [],
    handleChange,
    handleStateChange,
    transformer,
  }: Options<T, N, M>) {
    this.actions = {}
    this.inputRules = {}
    this.keys = {}
    this.marks = {} as Record<M, MarkSpec>
    this.nodes = {} as Record<N, NodeSpec>
    this.nodeViews = {} as Record<N | M, NodeViewCreator<Schema<N, M>>>
    this.plugins = {}

    this.debounce = debounce
    this.handleStateChange = handleStateChange

    for (const extension of extensions) {
      if (extension.marks) {
        // @ts-ignore
        for (const [key, mark] of Object.entries<MarkSpec>(extension.marks)) {
          this.marks[key as M] = mark
        }
      }

      if (extension.nodes) {
        // @ts-ignore
        for (const [key, node] of Object.entries<NodeSpec>(extension.nodes)) {
          this.nodes[key as N] = node
        }
      }
    }

    this.schema = new Schema<N, M>({
      marks: this.marks,
      nodes: this.nodes,
    })

    this.transformer = new transformer(this.schema)

    for (const extension of extensions) {
      if (extension.actions) {
        for (const [key, action] of Object.entries(
          extension.actions(this.schema)
        )) {
          this.actions[key] = action

          if (action.key && action.run) {
            // TODO: merge duplicate keys
            this.keys[action.key] = action.run
          }
        }
      }

      if (extension.plugins) {
        for (const [key, plugin] of Object.entries(
          extension.plugins(this.schema)
        )) {
          this.plugins[key] = plugin
        }
      }

      if (extension.styles) {
        Promise.all(extension.styles.map((style) => import(style)))
        // for (const style of extension.styles) {
        //   import(style)
        // }
      }

      if (extension.inputRules) {
        for (const [key, inputRule] of Object.entries(
          extension.inputRules(this.schema)
        )) {
          this.inputRules[key] = inputRule
        }
      }

      if (extension.nodeViews) {
        for (const [key, nodeView] of Object.entries<
          NodeViewCreator<Schema<N, M>>
        >(extension.nodeViews)) {
          this.nodeViews[key as N | M] = nodeView
        }
      }
    }

    this.plugins.keymap = keymap(this.keys)
    this.plugins.baseKeymap = keymap(baseKeymap)
    this.plugins.inputRules = inputRules({
      rules: Object.values(this.inputRules),
    })

    const state = EditorState.create({
      schema: this.schema,
      plugins: Object.values(this.plugins),
    })

    const handleDocChange =
      handleChange && this.handleDocChange(handleChange, debounce)

    const view = new EditorView(undefined, {
      state,
      dispatchTransaction: function (tr) {
        const { state, transactions } = view.state.applyTransaction(tr)

        view.updateState(state)

        if (handleStateChange) {
          handleStateChange(state)
        }

        if (handleDocChange) {
          if (transactions.some((tr) => tr.docChanged)) {
            handleDocChange(state.doc)
          }
        }
      },
    })

    this.view = view

    // TODO: dispatch a null transaction instead?

    if (handleStateChange) {
      handleStateChange(state)
    }
  }

  public setValue(value: T): void {
    const state = EditorState.create({
      doc: this.transformer.import(value),
      plugins: this.view.state.plugins,
      // TODO: selection?
    })

    this.view.updateState(state)

    if (this.handleStateChange) {
      this.handleStateChange(state)
    }
  }

  public handleDocChange = (
    handleChange: (value: T) => void,
    debounce = 500
  ) => {
    let timer: number

    return (doc: Node<Schema<N, M>>) => {
      if (timer) {
        window.clearTimeout(timer)
      }

      timer = window.setTimeout(() => {
        // console.log(doc)
        handleChange(this.transformer.export(doc))
      }, debounce)
    }
  }
}
