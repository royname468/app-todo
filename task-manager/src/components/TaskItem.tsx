import React from 'react';
import { Checkbox } from 'antd';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)}>
        {task.name}
      </Checkbox>
    </div>
  );
};

export default TaskItem;
