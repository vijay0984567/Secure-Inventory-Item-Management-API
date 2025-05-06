import { pgTable, text, uuid } from 'drizzle-orm/pg-core'; // Importing necessary Drizzle column types

// Defining the users table
export const users = pgTable('users', {
  // Unique user ID UUID
  id: uuid('id').defaultRandom().primaryKey(),

  // User's email -> must be unique & used for OTP login
  email: text('email').notNull().unique(),
});
