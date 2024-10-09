import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import { getTasks, createTask } from '../api/taskApi';
import { Task } from '../types/Task';

interface TaskFormStoryArgs {
  buttonColor: string;
  buttonText: string;
}

export default {
  title: 'Components/TaskForm',
  component: TaskForm,
  argTypes: {
    buttonColor: { control: 'color' },
    buttonText: { control: 'text' },
  },
};

const Template = (args: TaskFormStoryArgs) => { 
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleAddTask = async (name: string) => {
    await createTask({ name, completed: false });
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div>
      <TaskForm 
        onAddTask={handleAddTask} 
        buttonColor={args.buttonColor} 
        buttonText={args.buttonText} 
      />
    </div>
  );
};

export const Default = Template.bind({});
