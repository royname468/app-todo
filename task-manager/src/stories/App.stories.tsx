import { useEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import App from '../App';
import { getTasks } from '../api/taskApi';
import { Task } from '../types/Task';
import { notification, Spin } from 'antd';

export default {
  title: 'Example/App',
  component: App,
} as Meta;

const AppWithApiData: StoryFn = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks from API:', error);
        setError('Could not fetch tasks.');
        notification.error({ message: 'Could not fetch tasks.' });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <App tasks={tasks} />;
};

export const Default = AppWithApiData;
