import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubLight } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";

function CodeEditor({
  value,
  setValue,
  addValue,
  removeValue,
}: Readonly<{ value: string; setValue: (val: string) => void; addValue: () => void; removeValue: () => void }>) {
  const onChange = React.useCallback((val: React.SetStateAction<string>) => {
    setValue(val.toString());
  }, []);
  return (
    <div>
      <CodeMirror
        value={value}
        theme={githubLight}
        height="auto"
        width="100%"
        maxWidth="100%"
        extensions={[html(), EditorView.lineWrapping]}
        onChange={onChange}
        style={{ fontSize: "11pt" }}
      />
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-primary mr-2" onClick={addValue}>
          Add
        </button>
        <button type="button" className="btn btn-danger" onClick={removeValue}>
          Remove
        </button>
      </div>
    </div>
  );
}
export default CodeEditor;
