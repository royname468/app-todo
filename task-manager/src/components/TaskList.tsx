import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} />
      ))}
    </div>
  );
};

export default TaskList;
