import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/Task';
import axios from 'axios';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Dữ liệu không hợp lệ từ API:', response.data);
        }
      } catch (error) {
        console.error('Lỗi khi fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskName: string) => {
    try {
      const response = await axios.post('/tasks', {
        name: taskName,
        completed: false,
      });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Lỗi khi thêm task:', error);
    }
  };

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
    </div>
  );
};

export default App;
