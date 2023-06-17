import React from "react";

function SnippetList({ snippets, setEditData, deleteSnippet }) {
  return (
    <div className="snippet-list">
      {snippets.map((item, i) => {
        return (
          <div key={i} className="snippet">
            <h3 className="title">{item.title}</h3>
            <div className="desc">{item.description}</div>
            <pre className="code">{item.code}</pre>
            <div className="actions">
              <button
                className="btn btn-failure"
                onClick={() => deleteSnippet(item._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-success"
                onClick={() => setEditData(item)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SnippetList;
