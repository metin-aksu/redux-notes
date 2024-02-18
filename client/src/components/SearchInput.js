import React from "react";
import { useDispatch } from "react-redux";
import { searchNotes } from "../redux/noteSlice";

export default function SearchInput() {
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "100%",
          height: "30px",
          border: "2px solid #DEDEDE",
          borderRadius: "15px",
          paddingLeft: "10px",
        }}
        onChange={(e) => dispatch(searchNotes(e.target.value))}
      />
    </div>
  );
}
