import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const TodoForm = ({ fetchTodos }) => {
  const [text, setText] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post("/api/todos", { text }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setText("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-2 mb-4">
      <input
        className="flex-1 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
};

export default TodoForm;
