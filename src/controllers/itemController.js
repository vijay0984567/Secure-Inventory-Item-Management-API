import db from '../config/db.js';
import { items } from '../models/item.js';
import { eq } from 'drizzle-orm'; 

// Get all items for the authenticated user
export const getItems = async (req, res) => {
  const userId = req.user.userId;
  const userItems = await db.select().from(items).where(eq(items.ownerId, userId));
  res.status(200).json(userItems);
};

// Create a new item
export const createItem = async (req, res) => {
  const userId = req.user.userId;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Item name is required' });

  const result = await db.insert(items).values({ name, ownerId: userId }).returning();
  res.status(201).json(result[0]);
};

// Update the item by id but only if it belongs to user
export const updateItem = async (req, res) => {
  const userId = req.user.userId;
  const itemId = req.params.id;
  const { name } = req.body;

  const item = await db.select().from(items).where(eq(items.id, itemId));
  if (!item[0]) return res.status(404).json({ error: 'Item not found' });
  if (item[0].ownerId !== userId) return res.status(403).json({ error: 'Unauthorized' });

  await db.update(items).set({ name }).where(eq(items.id, itemId));
  res.status(200).json({ message: 'Item updated successfully' });
};

// Delete the item by id only if it belongs to user
export const deleteItem = async (req, res) => {
  const userId = req.user.userId;
  const itemId = req.params.id;

  const item = await db.select().from(items).where(eq(items.id, itemId));
  if (!item[0]) return res.status(404).json({ error: 'Item not found' });
  if (item[0].ownerId !== userId) return res.status(403).json({ error: 'Unauthorized' });

  await db.delete(items).where(eq(items.id, itemId));
  res.status(200).json({ message: 'Item deleted successfully' });
};
