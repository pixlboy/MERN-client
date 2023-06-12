import React, { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDesc, setEditorDesc] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getSnippets();
  }, []);

  // const searchByName = (value) => {
  //   const temp = items.filter((item) => {
  //     return item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  //   });
  //   setItemsCopy(temp);
  // };

  async function getSnippets() {
    const snippets = await Axios.get(
      "http://localhost:5000/snippet/getSnippets"
    );
    setSnippets(snippets.data);
  }

  async function deleteSnippet(id) {
    await Axios.delete(`http://localhost:5000/snippet/deleteSnippet/${id}`);
    getSnippets();
  }

  async function saveSnippet() {
    const snippet = {
      title: editorTitle,
      description: editorDesc,
      code: editorCode,
    };
    await Axios.post("http://localhost:5000/snippet/saveSnippet", snippet);
    getSnippets();
  }

  async function updateSnippet() {
    const snippet = {
      title: editorTitle,
      description: editorDesc,
      code: editorCode,
    };
    await Axios.put(
      `http://localhost:5000/snippet/updateSnippet/${editId}`,
      snippet
    );
    setEditId(null);
    getSnippets();
  }

  function setEditData({ title, description, code, _id }) {
    setEditorTitle(title);
    setEditorDesc(description);
    setEditorCode(code);
    setEditId(_id);
  }

  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
          />
          <input
            type="text"
            defaultValue={editorDesc}
            onChange={(e) => setEditorDesc(e.target.value)}
          />
          <textarea
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
          />
        </form>
        {!editId ? (
          <button onClick={saveSnippet}>Save</button>
        ) : (
          <button onClick={updateSnippet}>Update</button>
        )}
      </div>
      {snippets.map((item, i) => {
        return (
          <ul key={i}>
            <li>{item.title}</li>
            <li>{item.description}</li>
            <li>
              <pre>{item.code}</pre>
            </li>
            <li>
              <button onClick={() => deleteSnippet(item._id)}>Delete</button>
              <button onClick={() => setEditData(item)}>Edit</button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Home;
