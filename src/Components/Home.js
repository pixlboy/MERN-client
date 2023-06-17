import React, { useState, useEffect } from "react";
import Axios from "axios";
import SnippetList from "./SnippetList";
import Editor from "./Editor";

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
    clearEditor();
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
    clearEditor();
    getSnippets();
  }

  function setEditData({ title, description, code, _id }) {
    setEditorTitle(title);
    setEditorDesc(description);
    setEditorCode(code);
    setEditId(_id);
  }

  function clearEditor(){
    setEditorTitle("");
    setEditorDesc("");
    setEditorCode("");
  }

  return (
    <div className="snippet-manager">
      <Editor
        editorTitle={editorTitle}
        editorDesc={editorDesc}
        editorCode={editorCode}
        setEditorTitle={setEditorTitle}
        setEditorDesc={setEditorDesc}
        setEditorCode={setEditorCode}
        editId={editId}
        saveSnippet={saveSnippet}
        updateSnippet={updateSnippet}
      ></Editor>
      <SnippetList
        snippets={snippets}
        setEditData={setEditData}
        deleteSnippet={deleteSnippet}
      />
    </div>
  );
}

export default Home;
