import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import TaskForm from "../components/TaskForm";

const TaskEditPage = ({ tasks, onEditTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === parseInt(id, 10));
    if (foundTask) {
      setTask(foundTask);
    }
  }, [id, tasks]);

  if (!task) {
    return <Typography variant="h6">Task not found</Typography>;
  }

  const handleSubmit = (updatedTask) => {
    onEditTask({ ...updatedTask, id: parseInt(id, 10) });
    navigate("/tasks");
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Edit Task</Typography>
      <TaskForm onSubmit={handleSubmit} task={task} />
      <Button variant="outlined" color="secondary" onClick={() => navigate("/tasks")} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default TaskEditPage;