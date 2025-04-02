-- Disable RLS temporarily to allow initial user creation
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Create a public access policy for the users table
DROP POLICY IF EXISTS "Public access" ON users;
CREATE POLICY "Public access"
ON users FOR ALL
USING (true);

-- Users table is already part of supabase_realtime publication