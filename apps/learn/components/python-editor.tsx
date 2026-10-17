"use client";

import dynamic from "next/dynamic";
import type { BeforeMount } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="py-editor-loading">Editor wird geladen …</div>,
});

const beforeMount: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("tanisten-edu", {
    base: "vs-dark",
    inherit: true,
    rules: [{ token: "comment", foreground: "73737d" }, { token: "keyword", foreground: "ff5c78" }, { token: "string", foreground: "b8e986" }, { token: "number", foreground: "f6c177" }, { token: "type.identifier", foreground: "8ec5ff" }],
    colors: { "editor.background": "#0a0a0d", "editorLineNumber.foreground": "#555560", "editorLineNumber.activeForeground": "#f4f4f5", "editorCursor.foreground": "#ff2d55", "editor.selectionBackground": "#d9042944", "editor.inactiveSelectionBackground": "#d9042928" },
  });
  monaco.languages.setLanguageConfiguration("python", { brackets: [["{", "}"], ["[", "]"], ["(", ")"]], autoClosingPairs: [{ open: "(", close: ")" }, { open: "[", close: "]" }, { open: "{", close: "}" }, { open: "\"", close: "\"" }, { open: "'", close: "'" }] });
  monaco.languages.registerCompletionItemProvider("python", { provideCompletionItems: () => ({ suggestions: ["print", "len", "range", "input", "str", "int", "float", "list", "dict", "for", "while", "if", "def", "return"].map((label) => ({ label, kind: monaco.languages.CompletionItemKind.Function, insertText: label, detail: "Python-Grundfunktion" })) }) });
};

export default function PythonEditor({ value, onChange, readOnly }: { value: string; onChange: (value: string) => void; readOnly: boolean }) {
  return <MonacoEditor className="py-monaco" height="100%" defaultLanguage="python" theme="tanisten-edu" value={value} beforeMount={beforeMount} onChange={(nextValue) => onChange(nextValue ?? "")} options={{ readOnly, automaticLayout: true, fontSize: 14, fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace", lineHeight: 23, tabSize: 4, insertSpaces: true, minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: "on", quickSuggestions: true, suggestOnTriggerCharacters: true, acceptSuggestionOnEnter: "on", autoClosingBrackets: "always", autoClosingQuotes: "always", bracketPairColorization: { enabled: true }, formatOnPaste: true }} />;
}
