import { useEffect, useState } from 'react';
import { getTasks } from '../api/taskApi';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        const initialCompletedTasks = data.reduce((acc, task) => {
          acc[task.id] = task.completed;
          return acc;
        }, {} as { [key: number]: boolean });
        setCompletedTasks(initialCompletedTasks);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggle = (id: number) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={{ ...task, completed: completedTasks[task.id] }}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
