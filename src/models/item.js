import { pgTable, text, uuid } from 'drizzle-orm/pg-core'; // Importing Drizzle column types
import { users } from './user.js'; // Importing users table for reference

// Defining the 'items' table
export const items = pgTable('items', {
  
  id: uuid('id').defaultRandom().primaryKey(), // Unique item ID 
  name: text('name').notNull(), // Name of the inventory item 
  ownerId: uuid('owner_id').references(() => users.id), // Foreign key- Owner ID refers to the users table
});
