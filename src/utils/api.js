import tasks from "../mock/tasks";

export const getTasks = () => Promise.resolve(tasks);

export const getTaskById = (id) => Promise.resolve(tasks.find(task => task.id === id));

export const addTask = (newTask) => {
  tasks.push({ id: tasks.length + 1, ...newTask });
  return Promise.resolve(newTask);
};

export const updateTask = (id, updatedTask) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) tasks[index] = { ...tasks[index], ...updatedTask };
  return Promise.resolve(tasks[index]);
};

export const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) tasks.splice(index, 1);
  return Promise.resolve();
};

export const getLatestTaskId = () => {
  if (tasks.length === 0) {
    return 0;
  }
  return Math.max(...tasks.map(task => task.id));
};