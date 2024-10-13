import React from "react";
import { List, ListItem, ListItemText, Button, Typography, Chip } from "@mui/material";

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => (
  <List>
    {tasks.map((task) => (
      <ListItem key={task.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2, border: '1px solid #e0e0e0', borderRadius: '4px', p: 2 }}>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{task.description}</Typography>
        <Chip label={task.status} color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'warning' : 'default'} sx={{ mb: 1 }} />
        {task.dueDate && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        )}
        <div>
          {task.status !== 'Completed' && (
            <Button onClick={() => onComplete(task.id)} variant="outlined" size="small" sx={{ mr: 1 }}>Complete</Button>
          )}
          <Button onClick={() => onEdit(task.id)} variant="outlined" size="small" sx={{ mr: 1 }}>Edit</Button>
          <Button onClick={() => onDelete(task.id)} variant="outlined" color="error" size="small">Delete</Button>
        </div>
      </ListItem>
    ))}
  </List>
);

export default TaskList;