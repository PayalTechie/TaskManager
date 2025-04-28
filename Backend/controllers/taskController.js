import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    try {
      const status = req.query.status; // yaha query param se status pakdenge
  
      let filter = { userId: req.user.id }; // pehle se hi user wise filter hai
  
      if (status === 'Active') {
        filter.status = 'incomplete';
      } else if (status === 'Completed') {
        filter.status = 'complete';
      }
      // agar 'All' ya kuch nahi diya to sab tasks dikha denge
  
      const tasks = await Task.find(filter);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const task = new Task({
      title,
      description,
      priority,
      userId: req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
