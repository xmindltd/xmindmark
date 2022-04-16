import * as monaco from 'monaco-editor'

declare interface globalThis {
  Snowbrush: any
  sb: any
  monaco: monaco
  editor: monaco.editor.IStandaloneCodeEditor
}