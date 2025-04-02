-- Enable Row Level Security on users table if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own record during signup
DROP POLICY IF EXISTS "Users can insert their own record" ON users;
CREATE POLICY "Users can insert their own record"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to select their own record
DROP POLICY IF EXISTS "Users can view their own record" ON users;
CREATE POLICY "Users can view their own record"
ON users FOR SELECT
USING (auth.uid() = id);

-- Create policy to allow users to update their own record
DROP POLICY IF EXISTS "Users can update their own record" ON users;
CREATE POLICY "Users can update their own record"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to delete their own record
DROP POLICY IF EXISTS "Users can delete their own record" ON users;
CREATE POLICY "Users can delete their own record"
ON users FOR DELETE
USING (auth.uid() = id);
