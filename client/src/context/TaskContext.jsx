import { createContext, useContext, useReducer, useCallback } from 'react';
import * as taskApi from '../api/taskApi';

const TaskContext = createContext();

const initialState = { tasks: [], loading: false, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_TASKS':
      return { ...state, loading: false, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = useCallback(async (filters = {}) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { data } = await taskApi.getTasks(filters);
      dispatch({ type: 'SET_TASKS', payload: data });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
    }
  }, []);

  const addTask = async (taskData) => {
    const { data } = await taskApi.createTask(taskData);
    dispatch({ type: 'ADD_TASK', payload: data });
  };

  const editTask = async (id, taskData) => {
    const { data } = await taskApi.updateTask(id, taskData);
    dispatch({ type: 'UPDATE_TASK', payload: data });
  };

  const removeTask = async (id) => {
    await taskApi.deleteTask(id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <TaskContext.Provider value={{ ...state, fetchTasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
