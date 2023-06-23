import React from "react";
import "./SnippetEditor.scss";

function SnippetEditor({
  editorTitle,
  editorDesc,
  editorCode,
  setEditorTitle,
  setEditorDesc,
  setEditorCode,
  editId,
  saveSnippet,
  updateSnippet,
}) {
  return (
    <div className="snippet-editor">
      <form>
        <div className="form-item">
          <label>Title</label>
          <input
            type="text"
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Description</label>
          <input
            type="text"
            value={editorDesc}
            onChange={(e) => setEditorDesc(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Code</label>
          <textarea
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
          />
        </div>
      </form>
      <div className="actions">
        {!editId ? (
          <button className="btn btn-default" onClick={saveSnippet}>
            Save
          </button>
        ) : (
          <button className="btn btn-default" onClick={updateSnippet}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SnippetEditor;
