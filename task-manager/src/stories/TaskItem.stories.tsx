import { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';
import { getTasks } from '../api/taskApi';

export default {
  title: 'Components/TaskItem',
  component: TaskItem,
};

const Template = (_args: { task: Task; onToggle: (id: number) => void }) => {
  const [task, setTask] = useState<Task | null>(null);
  console.log(_args);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      if (tasks.length > 0) {
        setTask(tasks[0]);
      }
    };
    fetchTasks();
  }, []);

  if (!task) {
    return <div>Loading...</div>;
  }

  const handleToggle = (id: number) => {
    console.log(`Task ${id} toggled`);
  };

  return <TaskItem task={task} onToggle={handleToggle} />;
};

export const Default = Template.bind({});
