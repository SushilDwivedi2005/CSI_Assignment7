import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { getToken } from "../utils/auth";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const token = getToken();
      // console.log("token being sent:", getToken());
      const response = await axios.get("/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
        <Header />
        <TodoForm fetchTodos={fetchTodos} />
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </div>
    </div>
  );
};

export default Home;
