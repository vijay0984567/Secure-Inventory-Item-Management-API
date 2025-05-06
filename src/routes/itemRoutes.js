import express from 'express';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes below are protected with JWT
router.use(authenticateUser);

// Get all items for current user
router.get('/', getItems);

// Create a new item
router.post('/', createItem);

// Update an item
router.put('/:id', updateItem);

// Delete an item
router.delete('/:id', deleteItem);

export default router;
