// src/components/TaskList.tsx
import React from 'react';
import { Checkbox } from 'antd';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          >
            {task.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
