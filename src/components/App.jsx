import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  /*
    Fetch all Notes the moment this App component loads for the first time
  */
  useEffect(() => {
    axios.get("https://graceful-tan-barnacle.cyclic.app/api/notes")
      .then((res) => { setNotes(res.data); })
      .catch((err) => console.error(err));
  }, []);

  /*
      Add a note to DB and update state
    */
  function addNote(newNote) {
    axios.post("https://graceful-tan-barnacle.cyclic.app/api/note/add", newNote)
      .then((res) => setNotes([...notes, res.data]))
      .catch((err) => console.log(err));
  }

  function deleteNote(id) {
    axios.post("https://graceful-tan-barnacle.cyclic.app/api/note/delete", { noteId: id })
      .catch((err) => console.log(err));

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
