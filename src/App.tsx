import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client'; // ✅ Socket.io
import './App.css';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const socket = io('http://localhost:5000'); // ✅ Connect to server

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState<any>(null);

  const fetchTasks = async () => {
    const res = await axios.get<Task[]>('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();

    // ✅ Socket listeners
    socket.on('taskAdded', (task: Task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on('taskUpdated', (updated: Task) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updated._id ? updated : task))
      );
    });

    socket.on('taskDeleted', (id: string) => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
    });

    return () => {
      socket.off('taskAdded');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post<Task>('http://localhost:5000/api/tasks', {
      title: newTask,
    });
    setNewTask('');
    // 👆 No need to manually update state. Socket.io will do it.
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      completed: !task.completed,
    });
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="app-container">
      <h1>📝 TaskWise</h1>

      <div className="auth-buttons">
        {user ? (
          <>
            <span>👋 Welcome, {user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </div>

      <div className="task-form">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="task-item"
            >
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id)}
                />
                <span className={task.completed ? 'completed-text' : ''}>
                  {task.title}
                </span>
              </label>
              <button onClick={() => deleteTask(task._id)}>❌</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
