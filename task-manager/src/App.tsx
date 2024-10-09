import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import { Task } from './types/Task';
import axios from 'axios';
import { Table, Tabs, Checkbox } from 'antd';

interface AppProps {
  tasks?: Task[];
}

const App: React.FC<AppProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks || []);

  useEffect(() => {
    if (!initialTasks) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('/tasks');
          if (Array.isArray(response.data)) {
            setTasks(response.data);
          } else {
            console.error('Dữ liệu không hợp lệ từ API:', response.data);
          }
        } catch (error) {
          console.error('Lỗi khi fetching tasks:', error);
        }
      };
      fetchTasks();
    }
  }, [initialTasks]);

  const handleAddTask = async (taskName: string) => {
    try {
      const response = await axios.post('/tasks', {
        name: taskName,
        completed: false,
      });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Lỗi khi thêm task:', error);
    }
  };

  const handleCheckboxChange = async (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      const newCompletedStatus = !task.completed;
      try {
        await axios.patch(`/tasks/${taskId}`, {
          completed: newCompletedStatus,
        });
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, completed: newCompletedStatus } : t
          )
        );
      } catch (error) {
        console.error('Lỗi khi cập nhật task:', error);
      }
    }
  };

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const items = [
    {
      key: 'all',
      label: 'All',
      children: (
        <Table dataSource={tasks} pagination={false} columns={columns} rowKey="id" />
      ),
    },
    {
      key: 'completed',
      label: 'Completed',
      children: (
        <Table
          dataSource={tasks.filter((task) => task.completed)}
          pagination={false}
          columns={columns}
          rowKey="id"
        />
      ),
    },
    {
      key: 'incomplete',
      label: 'Incomplete',
      children: (
        <Table
          dataSource={tasks.filter((task) => !task.completed)}
          pagination={false}
          columns={columns}
          rowKey="id"
        />
      ),
    },
  ];

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div style={{ marginBottom: '16px' }}>
        {tasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
          >
            {task.name}
          </Checkbox>
        ))}
      </div>
      <Tabs defaultActiveKey="all" items={items} />
    </div>
  );
};

export default App;
