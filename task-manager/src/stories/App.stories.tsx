import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import App from '../App';
import { getTasks } from '../api/taskApi'; // Sử dụng API của bạn
import { Task } from '../types/Task';

export default {
  title: 'Example/App',
  component: App,
} as Meta;

export const AppWithApiData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(); // Lấy dữ liệu từ API
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks from API:', error);
      }
    };

    fetchTasks();
  }, []);

  return <App tasks={tasks} />;
};
