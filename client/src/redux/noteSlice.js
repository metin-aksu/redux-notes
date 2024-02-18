import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REACT_APP_BACKEND_API = "http://localhost:4000";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetch(`${REACT_APP_BACKEND_API}/notes`);
  const data = await response.json();
  return data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  console.log("deleteNote: silinecek id", id);
  await fetch(`${REACT_APP_BACKEND_API}/notes/${id}`, {
    method: "DELETE",
  });
  return { id };
});

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const response = await fetch(`${REACT_APP_BACKEND_API}/notes`, {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    list: [],
    colors: ["#F06292", "#BA68C8", "#FFD550", "#4FC3F7", "#AED581"],
    searchList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    searchNotes: (state, action) => {
      state.searchList = state.list.filter((note) =>
        note.note.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.searchList = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.list = state.list.filter((note) => note.id !== action.payload.id);
        state.searchList = state.searchList.filter(
          (note) => note.id !== action.payload.id
        );
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
        state.searchList = [...state.searchList, action.payload];
      });
  },
});

export const allNotes = (state) => state.notes.list;
export const searchNotesList = (state) => state.notes.searchList;
export const { searchNotes } = noteSlice.actions;
export const colors = (state) => state.notes.colors;

export default noteSlice.reducer;
