import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes } from "./redux/noteSlice";

import SearchInput from "./components/SearchInput";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  },[dispatch]);
  return (
    <div style={{ maxWidth: "800px",  paddingRight: "20px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Notes App with Redux</h1>
      <NoteForm />
      <SearchInput />
      <NoteList />
    </div>
  );
}
