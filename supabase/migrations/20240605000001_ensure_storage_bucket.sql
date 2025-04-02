-- Ensure storage RLS is disabled
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Create permissive policies for buckets
DROP POLICY IF EXISTS "Allow all bucket operations" ON storage.buckets;
CREATE POLICY "Allow all bucket operations"
  ON storage.buckets
  USING (true)
  WITH CHECK (true);

-- Create permissive policies for objects
DROP POLICY IF EXISTS "Allow all object operations" ON storage.objects;
CREATE POLICY "Allow all object operations"
  ON storage.objects
  USING (true)
  WITH CHECK (true);

-- Ensure health_documents bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('health_documents', 'health_documents', true)
ON CONFLICT (id) DO NOTHING;
