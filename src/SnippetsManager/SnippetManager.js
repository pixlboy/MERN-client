import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import SnippetList from "../SnippetList/SnippetList";
import SnippetEditor from "../SnippetEditor/SnippetEditor";
import "./SnippetManager.scss";
import UserContext from "../Shared/UserProvider";

function Home() {
  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDesc, setEditorDesc] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [editId, setEditId] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    getSnippets();
  }, [user]);

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
    setLoading(false);
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

  function clearEditor() {
    setEditorTitle("");
    setEditorDesc("");
    setEditorCode("");
  }

  return (
    <div className="snippet-manager">
      {user && user !== null && (
        <>
          <SnippetEditor
            editorTitle={editorTitle}
            editorDesc={editorDesc}
            editorCode={editorCode}
            setEditorTitle={setEditorTitle}
            setEditorDesc={setEditorDesc}
            setEditorCode={setEditorCode}
            editId={editId}
            saveSnippet={saveSnippet}
            updateSnippet={updateSnippet}
          ></SnippetEditor>
          {!loading && snippets?.length === 0 ? (
            <h6 className="error">You have not created any snippets yet.</h6>
          ) : (
            <SnippetList
              snippets={snippets}
              setEditData={setEditData}
              deleteSnippet={deleteSnippet}
            />
          )}
        </>
      )}
      {user === null && <h6 className="error">You are not logged in.</h6>}
    </div>
  );
}
export default Home;
