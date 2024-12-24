-- init.sql

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample records
INSERT INTO users (name, email, age)
VALUES
  ('Alice', 'alice@example.com', 25),
  ('Bob', 'bob@example.com', 30),
  ('Charlie', 'charlie@example.com', 28)
ON CONFLICT (email) DO NOTHING;
