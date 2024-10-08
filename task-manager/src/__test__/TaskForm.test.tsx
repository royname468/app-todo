// src/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders task manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Task Manager/i);
  expect(titleElement).toBeInTheDocument();
});

test('adds a new task', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new task/i);
  const button = screen.getByText(/Add Task/i);

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);

  const taskElement = await screen.findByText(/New Task/i);
  expect(taskElement).toBeInTheDocument();
});

test('does not add an empty task', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new task/i);
  const button = screen.getByText(/Add Task/i);

  fireEvent.change(input, { target: { value: '' } });
  fireEvent.click(button);

  const errorElement = await screen.findByText(/Task cannot be empty/i);
  expect(errorElement).toBeInTheDocument();
});

test('removes a task', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new task/i);
  const button = screen.getByText(/Add Task/i);

  fireEvent.change(input, { target: { value: 'Task to be removed' } });
  fireEvent.click(button);

  const taskElement = await screen.findByText(/Task to be removed/i);
  expect(taskElement).toBeInTheDocument();

  const removeButton = screen.getByText(/Remove/i);
  fireEvent.click(removeButton);

  const removedTaskElement = screen.queryByText(/Task to be removed/i);
  expect(removedTaskElement).not.toBeInTheDocument();
});
