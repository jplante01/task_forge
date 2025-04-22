-- Migration file: 20250422190403_dev_schema_setup.sql

-- First, create a development users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert test users (only if they don't exist)
INSERT INTO public.users (id, email, name)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user1@example.com', 'User One'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'user2@example.com', 'User Two'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'user3@example.com', 'User Three')
ON CONFLICT (id) DO NOTHING;

-- Modify the projects table to reference the public.users table instead of auth.users
-- First, drop the existing foreign key constraint if it exists
ALTER TABLE public.projects 
  DROP CONSTRAINT IF EXISTS projects_user_id_fkey;

-- Add the new foreign key constraint referencing public.users
ALTER TABLE public.projects
  ADD CONSTRAINT projects_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Set up permissive RLS for development
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop policy if it exists (we need to do this explicitly since there's no IF NOT EXISTS for policies)
DO $$
BEGIN
  BEGIN
    DROP POLICY "Dev users open access" ON public.users;
  EXCEPTION
    WHEN undefined_object THEN
      -- Policy doesn't exist, so nothing to do
  END;
END $$;

-- Create the policy
CREATE POLICY "Dev users open access" 
  ON public.users FOR ALL USING (true);

-- Same for projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  BEGIN
    DROP POLICY "Dev projects open access" ON public.projects;
  EXCEPTION
    WHEN undefined_object THEN
      -- Policy doesn't exist, so nothing to do
  END;
END $$;

CREATE POLICY "Dev projects open access" 
  ON public.projects FOR ALL USING (true);