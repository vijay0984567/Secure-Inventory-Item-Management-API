import dotenv from 'dotenv';
dotenv.config();

// Debug print to confirm DATABASE_URL is loaded
console.log("🔥 DATABASE_URL Loaded:", process.env.DATABASE_URL); 

// Export Drizzle ORM config
export default {
  schema: "./src/models/index.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
