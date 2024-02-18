import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { colors, addNote } from "../redux/noteSlice";
import check from "../assets/check.svg";

export default function NoteForm() {
  const dispatch = useDispatch();
  const noteColors = useSelector(colors);

  const [newNoteColor, setNewNoteColor] = useState("#F06292");
  const [newNote, setNewNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote === "") {
      alert("Please enter a note");
    } else {
      dispatch(addNote({ note: newNote, color: newNoteColor }));
      setNewNote("");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "170px",
        marginTop: "20px",
        marginBottom: "20px",
        border: "2px solid #DEDEDE",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <textarea
        style={{
          width: "97%",
          height: "100px",
          padding: "10px",
          border: "0px",
        }}
        placeholder="Enter your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          {noteColors.map((color) => (
            <div
              key={color}
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "15px",
                backgroundColor: color,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setNewNoteColor(color)}
            >
              {newNoteColor === color && <img src={check} alt="check" />}
            </div>
          ))}
        </div>
        <button
          style={{
            border: "1px solid #44C766",
            borderRadius: "15px",
            cursor: "pointer",
            backgroundColor: "#44C766",
            color: "#fff",
            padding: "8px 30px",
          }}
          onClick={handleSubmit}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
