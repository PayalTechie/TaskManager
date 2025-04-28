import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // import karlo

const router = express.Router();

// Now protect all routes:
router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.patch('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
