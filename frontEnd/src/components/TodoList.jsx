import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TodoList = ({ todos, fetchTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleDelete = async (id) => {
    await axios.delete(`/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTodos();
  };

  const handleToggle = async (id, completed) => {
    await axios.patch(`/api/todos/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTodos();
  };

  const handleSaveEdit = async (id) => {
    await axios.patch(`/api/todos/${id}`, { text: editText }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setEditingId(null);
    fetchTodos();
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div key={todo._id} className="flex justify-between items-center p-2 border rounded">
          {editingId === todo._id ? (
            <>
              <input
                className="flex-1 border p-1 mr-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(todo._id)} className="text-green-500">
                <MdOutlineDone />
              </button>
              <button onClick={() => setEditingId(null)} className="text-gray-500">
                <IoClose />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo._id, todo.completed)}
                />
                <span className={`truncate ${todo.completed ? "line-through text-gray-500" : ""}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setEditingId(todo._id);
                  setEditText(todo.text);
                }} className="text-blue-500">
                  <MdModeEditOutline />
                </button>
                <button onClick={() => handleDelete(todo._id)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
