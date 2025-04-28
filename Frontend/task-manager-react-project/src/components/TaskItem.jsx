import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleMarkComplete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.patch(
        `http://localhost:3000/api/tasks/${task._id}`,
        { status: 'complete' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error('Error marking task as complete:', err);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p><span className="font-medium">Status:</span> {task.status}</p>
      <p><span className="font-medium">Priority:</span> {task.priority}</p>
      <div className="flex gap-2 mt-2">
        {task.status === 'incomplete' && (
          <button 
            onClick={handleMarkComplete} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
          >
            Mark Complete
          </button>
        )}
        <button 
          onClick={handleDelete} 
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

