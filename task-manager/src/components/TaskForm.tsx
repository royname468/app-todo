import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { createTask } from '../api/taskApi'; // Import hàm createTask từ api

interface TaskFormProps {
  onAddTask: (name: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      message.warning('Please enter a task name!');
      return;
    }

    try {
      await onAddTask(taskName); 
      setTaskName('');
    } catch (error) {
      message.error('Failed to add task. Please try again.');
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <Input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task"
        style={{ width: '300px', marginRight: '8px' }}
      />
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default TaskForm;
