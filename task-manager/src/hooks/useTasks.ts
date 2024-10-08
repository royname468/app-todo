import { useEffect, useState } from 'react';
import { getTasks, createTask } from '../api/taskApi';
import { Task } from '../types/Task';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const initialTasks = await getTasks();
      setTasks(initialTasks);
    };
    fetchTasks();
  }, []);

  const addTask = async (name: string) => {
    const newTask = await createTask({ name, completed: false });
    setTasks((prev) => [...prev, newTask]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return { tasks: filteredTasks, addTask, setFilter };
};

export default useTasks;
