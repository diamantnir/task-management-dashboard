import React, { useState } from "react";
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { addTask,getLatestTaskId } from "../utils/api";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      const latestId = await getLatestTaskId();
      const newTask = {
        id: latestId + 1,
        title,
        description,
        status,
        dueDate: dueDate || null,
      };
      await addTask(newTask);
      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
};



export default NewTask;