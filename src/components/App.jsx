import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

console.log("uuid:", uuidv4());

function App() {
  const [notes, setNotes] = useState([]);

  /*
    Fetch all People the moment this App component loads for the first time
    Notes: The proxy enables us to use axios without the full url http://localhost:4747/api/people
           The empty array [] parameter ensures that the code inside useEffect() runs once
  */
  useEffect(() => {
    axios.get("https://graceful-tan-barnacle.cyclic.app/api/notes")
      .then((res) => {setNotes(res.data);})
      .catch((err) => console.error(err));
  }, []);

  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  /*
      Add a person to DB and update state
      Notes: The proxy enables us to use axios without the full url http://localhost:4747/api/person/add
    */
  function addNote(newNote) {
    console.log(notes)

    axios.post("https://graceful-tan-barnacle.cyclic.app/api/note/add", newNote)
      .then((res) => setNotes([...notes, res.data]))
      .catch((err) => console.log(err));
  }

  function deleteNote(id) {
    console.log("deleteNote()")
    console.log("localhost")
    axios.post("https://graceful-tan-barnacle.cyclic.app/api/note/delete", {noteId:id})
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
