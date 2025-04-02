-- Fix RLS policy for users table to allow new sign-ups

-- First, drop the existing policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile" ON "public"."users";

-- Create a new policy that allows users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON "public"."users"
FOR INSERT 
WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- Ensure the policy for selecting users still exists
DROP POLICY IF EXISTS "Users can view all profiles" ON "public"."users";
CREATE POLICY "Users can view all profiles" 
ON "public"."users"
FOR SELECT 
USING (true);

-- Ensure the policy for updating users still exists
DROP POLICY IF EXISTS "Users can update own profile" ON "public"."users";
CREATE POLICY "Users can update own profile" 
ON "public"."users"
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
