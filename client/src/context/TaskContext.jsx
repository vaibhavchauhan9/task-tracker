import { createContext, useContext, useReducer, useCallback } from 'react';
import * as taskApi from '../api/taskApi';

const TaskContext = createContext();

const initialState = {
  tasks:   [],
  loading: false,
  error:   null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_TASKS':
      return { ...state, loading: false, tasks: action.payload, error: null };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t._id === action.payload._id ? action.payload : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t._id !== action.payload),
      };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function extractTasks(data) {
  if (Array.isArray(data))            return data;
  if (Array.isArray(data?.data))      return data.data;
  if (Array.isArray(data?.tasks))     return data.tasks;
  return [];
}

function extractTask(data) {
  if (data?.data && typeof data.data === 'object') return data.data;
  return data;
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = useCallback(async (filters = {}) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await taskApi.getTasks(filters);
      dispatch({ type: 'SET_TASKS', payload: extractTasks(res.data) });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: 'Failed to load tasks' });
    }
  }, []);

  const addTask = useCallback(async (formData) => {
    const res = await taskApi.createTask(formData);
    dispatch({ type: 'ADD_TASK', payload: extractTask(res.data) });
  }, []);

  const editTask = useCallback(async (id, formData) => {
    const res = await taskApi.updateTask(id, formData);
    dispatch({ type: 'UPDATE_TASK', payload: extractTask(res.data) });
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskApi.deleteTask(id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  return (
    <TaskContext.Provider
      value={{ ...state, fetchTasks, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}