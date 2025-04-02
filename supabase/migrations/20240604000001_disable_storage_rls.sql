-- Disable RLS for storage.buckets to allow bucket creation
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Create a permissive policy for storage.buckets
DROP POLICY IF EXISTS "Public access" ON storage.buckets;
CREATE POLICY "Public access"
ON storage.buckets FOR ALL
USING (true);

-- Disable RLS for storage.objects to allow file uploads
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Create a permissive policy for storage.objects
DROP POLICY IF EXISTS "Public access" ON storage.objects;
CREATE POLICY "Public access"
ON storage.objects FOR ALL
USING (true);
