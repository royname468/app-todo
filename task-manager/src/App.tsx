import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import { Task } from './types/Task';
import axios from 'axios';
import { Table, Tabs, Checkbox } from 'antd';
import styled from 'styled-components';

interface AppProps {
  tasks?: Task[];
}

const AppContainer = styled.div`
  padding: 20px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TaskListTitle = styled.h3`
  margin-bottom: 12px;
  color: #555;
  font-size: 20px;
`;

const TaskList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledCheckboxWrapper = styled.div`
  display: flex; /* Thiết lập display: flex */
  align-items: center; /* Canh giữa theo chiều dọc */
  margin-bottom: 10px; /* Khoảng cách giữa các checkbox */
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px; /* Khoảng cách giữa checkbox và tên task */
  font-size: 16px;
  color: #333;
`;

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
      const response = await axios.post('http://localhost:5005/tasks', {
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
        await axios.patch(`http://localhost:5005/tasks/${taskId}`, {
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
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span>{text}</span> 
      ),
    },
  ];

  const items = [
    {
      key: 'all',
      label: 'All',
      children: (
        <Table
          dataSource={tasks}
          pagination={false}
          columns={columns}
          rowKey="id"
        />
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
    <AppContainer>
      <Title>Task Manager</Title>
      <TaskForm onAddTask={handleAddTask} />
      
      <CheckboxContainer>
        <TaskListTitle>List Tasks</TaskListTitle>
        <TaskList>
          {tasks.map((task) => (
            <StyledCheckboxWrapper key={task.id}>
              <StyledCheckbox
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <span>{task.name}</span>
            </StyledCheckboxWrapper>
          ))}
        </TaskList>
      </CheckboxContainer>
    
      <Tabs defaultActiveKey="all" items={items} />
    </AppContainer>
  );
};

export default App;
