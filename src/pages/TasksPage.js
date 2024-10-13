import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { getTasks, deleteTask, updateTask } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = (id) => {
    debugger;
    deleteTask(id).then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  const handleComplete = (id) => {
    updateTask(id, { status: "Completed", completionDate: new Date() }).then((updatedTask) => {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    });
  };

  const handleEdit = (id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>Task List</Typography>
      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
        onComplete={handleComplete} 
        onEdit={handleEdit}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/tasks/new")}
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TasksPage;