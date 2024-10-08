// App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../api/taskApi';

jest.mock('../api/taskApi');

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('adds a new task', async () => {
    (api.createTask as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'New Task',
      completed: false,
    });

    render(<App />);

    const input = screen.getByPlaceholderText('Add a new task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    const taskElement = await screen.findByText(/New Task/i);
    expect(taskElement).toBeInTheDocument();
  });
});
