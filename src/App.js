// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import NewTask from "./components/NewTask";
import TaskEditPage from "./pages/TaskEditPage";
import { getTasks, addTask, updateTask, deleteTask } from "./utils/api";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAddTask = (newTask) => {
    addTask(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    });
  };

  const handleEditTask = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask).then((editedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
    });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    });
  };



  const handleCompleteTask = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: "Completed" };
      handleEditTask(updatedTask);
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/tasks" 
          element={
            <TasksPage 
              tasks={tasks} 
              onDeleteTask={handleDeleteTask} 
              onEditTask={handleEditTask}
              onCompleteTask={handleCompleteTask}
            />
          } 
        />
        <Route
          path="/tasks/:id"
          element={<TaskEditPage tasks={tasks} onEditTask={handleEditTask} />}
        />
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks/new" element={<NewTask onAddTask={handleAddTask} />} />
      </Routes>
    </Router>
  );
};

export default App;