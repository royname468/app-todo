import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:5005/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
