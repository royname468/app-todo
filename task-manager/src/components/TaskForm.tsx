import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (taskName: string) => void;
  buttonColor?: string;
  buttonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, buttonColor = 'blue', buttonText = 'Add Task' }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
      setError('');
    } else {
      setError('Task name is required');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        style={{ width: '300px', marginRight: '8px', padding: '8px' }}
      />
      <button 
        style={{
          background: buttonColor,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background 0.3s, transform 0.3s',
        }}
        type="submit"
      >
        {buttonText}
      </button>
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>} 
    </form>
  );
};

export default TaskForm;
