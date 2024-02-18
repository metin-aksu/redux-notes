import { useSelector, useDispatch } from "react-redux";
import { searchNotesList, deleteNote } from "../redux/noteSlice";
import delete_icon from "../assets/delete.svg";

export default function NoteList() {
  const dispatch = useDispatch();
  const notes = useSelector(searchNotesList);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "top",
            width: "230px",
            border: "1px solid " + note.color,
            backgroundColor: note.color,
            color: "#000",
            padding: "10px",
          }}
        >
          <div>{note.note}</div>
          <div>
            <img
              src={delete_icon}
              alt="delete"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => handleDelete(note.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
