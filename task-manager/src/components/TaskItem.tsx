import React from 'react';
import { Checkbox } from 'antd';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTask }) => {
  return (
    <div>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      >
        {task.name}
      </Checkbox>
    </div>
  );
};

export default TaskItem;
