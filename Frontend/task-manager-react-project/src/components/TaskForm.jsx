// src/components/TaskForm.jsx

import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('incomplete');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      
      await axios.post(
        'http://localhost:3000/api/tasks',
        { title, description, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('incomplete');
      setSuccessMessage('Task added successfully!');
      setErrorMessage('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.error('Error adding task:', err);
      setErrorMessage('Failed to add task. Please try again.');
      setSuccessMessage('');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Add New Task</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 text-green-500 text-center font-semibold">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 text-red-500 text-center font-semibold">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      ></textarea>
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="w-1/2 p-2 border rounded "
        >
          <option value="Low" className="bg-gray-800 text-white">Low</option>
          <option value="Medium" className="bg-gray-800 text-white">Medium</option>
          <option value="High" className="bg-gray-800 text-white">High</option>
        </select>
        <select
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="w-1/2 p-2 border rounded"
        >
          <option value="incomplete" className="bg-gray-800 text-white">Incomplete</option>
          <option value="complete" className="bg-gray-800 text-white">Complete</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
