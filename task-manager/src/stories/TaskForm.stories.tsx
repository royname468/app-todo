import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import { getTasks, createTask } from '../api/taskApi';
import { Task } from '../types/Task';

export default {
  title: 'Components/TaskForm',
  component: TaskForm,
};

export const Default = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleAddTask = async (name: string) => {
    await createTask({ name, completed: false });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
};
