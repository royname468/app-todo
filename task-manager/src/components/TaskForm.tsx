import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (taskName: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        style={{ width: '300px', marginRight: '8px', padding:'8px' }}
      />
      <button style={{background: 'blue', color: 'snow'}} type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
