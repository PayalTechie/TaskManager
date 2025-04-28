// src/components/TaskList.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/tasks?status=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-800 p-6 pt-24">
      <div className="flex justify-center bg-gray-800 gap-4 mb-6">
        <button onClick={() => setFilter('All')} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          All
        </button>
        <button onClick={() => setFilter('Active')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
          Active
        </button>
        <button onClick={() => setFilter('Completed')} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Completed
        </button>
      </div>

      <TaskForm fetchTasks={fetchTasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            fetchTasks={fetchTasks} 
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
