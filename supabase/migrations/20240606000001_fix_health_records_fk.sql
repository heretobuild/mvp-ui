-- Create a user record if it doesn't exist when uploading in demo mode

-- Create a function to ensure a demo user exists
CREATE OR REPLACE FUNCTION ensure_demo_user()
RETURNS TEXT AS $$
DECLARE
  demo_user_id TEXT := 'demo-user-id';
BEGIN
  -- Check if the demo user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = demo_user_id) THEN
    -- Insert a demo user into auth.users
    INSERT INTO auth.users (id, email, created_at, updated_at)
    VALUES (demo_user_id, 'demo@example.com', NOW(), NOW());
    
    -- Insert a corresponding record in public.users
    INSERT INTO public.users (id, email, full_name, created_at, updated_at)
    VALUES (demo_user_id, 'demo@example.com', 'Demo User', NOW(), NOW());
  END IF;
  
  RETURN demo_user_id;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to ensure the demo user exists
SELECT ensure_demo_user();
