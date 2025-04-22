
-- First, let's insert the projects
INSERT INTO public.projects (id, name, description, user_id, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Website Redesign', 'Overhaul of company website with new branding and improved UX', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2025-02-15T08:30:00Z', '2025-04-01T14:22:00Z'),
  ('22222222-2222-2222-2222-222222222222', 'Mobile App Development', 'Create iOS and Android apps for customer engagement', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2025-01-10T10:15:00Z', '2025-03-28T09:45:00Z'),
  ('33333333-3333-3333-3333-333333333333', 'Marketing Campaign', 'Q2 digital marketing initiative for product launch', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-03-05T11:20:00Z', '2025-04-10T16:30:00Z'),
  ('44444444-4444-4444-4444-444444444444', 'Database Migration', 'Migrate from legacy system to new cloud infrastructure', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2025-02-20T09:00:00Z', '2025-03-15T13:40:00Z'),
  ('55555555-5555-5555-5555-555555555555', 'Product Analytics', 'Implement tracking and reporting for user behavior', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-03-12T14:45:00Z', '2025-04-12T11:20:00Z');

-- Now, let's insert the tasks (Website Redesign project tasks)
INSERT INTO public.tasks (id, title, description, completed, starred, project_id, created_at, updated_at)
VALUES
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Conduct user research', 'Interview current users to identify pain points', true, true, '11111111-1111-1111-1111-111111111111', '2025-02-16T09:30:00Z', '2025-02-25T15:45:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000002', 'Create wireframes', 'Design low-fidelity wireframes for key pages', true, false, '11111111-1111-1111-1111-111111111111', '2025-02-26T10:15:00Z', '2025-03-05T13:20:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'Design new branding', 'Update logo, color palette, and typography', true, true, '11111111-1111-1111-1111-111111111111', '2025-03-01T11:00:00Z', '2025-03-12T09:30:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000004', 'Create high-fidelity mockups', 'Design detailed mockups based on wireframes', true, false, '11111111-1111-1111-1111-111111111111', '2025-03-10T14:20:00Z', '2025-03-20T16:45:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000005', 'Develop homepage', 'Implement new homepage design', true, false, '11111111-1111-1111-1111-111111111111', '2025-03-18T09:00:00Z', '2025-03-28T11:30:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000006', 'Develop about page', 'Implement new about page design', false, false, '11111111-1111-1111-1111-111111111111', '2025-03-22T13:45:00Z', '2025-03-22T13:45:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000007', 'Develop product pages', 'Implement new product page templates', false, true, '11111111-1111-1111-1111-111111111111', '2025-03-25T10:30:00Z', '2025-03-25T10:30:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000008', 'User testing', 'Conduct usability tests with sample users', false, false, '11111111-1111-1111-1111-111111111111', '2025-04-01T09:15:00Z', '2025-04-01T09:15:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000009', 'Bug fixes', 'Address issues identified during testing', false, false, '11111111-1111-1111-1111-111111111111', '2025-04-05T15:30:00Z', '2025-04-05T15:30:00Z'),
  ('aaaaaaaa-0001-0001-0001-000000000010', 'Launch website', 'Deploy new website to production', false, true, '11111111-1111-1111-1111-111111111111', '2025-04-10T08:00:00Z', '2025-04-10T08:00:00Z');

-- Mobile App Development project tasks
INSERT INTO public.tasks (id, title, description, completed, starred, project_id, created_at, updated_at)
VALUES
  ('bbbbbbbb-0002-0002-0002-000000000001', 'Requirements gathering', 'Define app features and requirements', true, true, '22222222-2222-2222-2222-222222222222', '2025-01-12T09:00:00Z', '2025-01-20T14:30:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000002', 'App wireframing', 'Create basic UI flow and screens', true, true, '22222222-2222-2222-2222-222222222222', '2025-01-22T13:15:00Z', '2025-02-01T10:45:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000003', 'UI/UX design', 'Create detailed app interface designs', true, false, '22222222-2222-2222-2222-222222222222', '2025-02-03T11:30:00Z', '2025-02-15T16:00:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000004', 'Set up development environment', 'Configure React Native and development tools', true, false, '22222222-2222-2222-2222-222222222222', '2025-02-10T09:45:00Z', '2025-02-12T11:20:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000005', 'Implement user authentication', 'Create login and registration screens', true, true, '22222222-2222-2222-2222-222222222222', '2025-02-16T13:00:00Z', '2025-02-28T15:30:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000006', 'Develop core features', 'Build main app functionality', true, false, '22222222-2222-2222-2222-222222222222', '2025-03-01T10:00:00Z', '2025-03-20T14:15:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000007', 'API integration', 'Connect app to backend services', false, true, '22222222-2222-2222-2222-222222222222', '2025-03-15T11:45:00Z', '2025-03-15T11:45:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000008', 'User testing', 'Conduct beta testing with focus group', false, false, '22222222-2222-2222-2222-222222222222', '2025-03-25T09:30:00Z', '2025-03-25T09:30:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000009', 'Performance optimization', 'Improve app speed and responsiveness', false, false, '22222222-2222-2222-2222-222222222222', '2025-04-01T14:00:00Z', '2025-04-01T14:00:00Z'),
  ('bbbbbbbb-0002-0002-0002-000000000010', 'App store submission', 'Prepare and submit app to iOS and Android stores', false, true, '22222222-2222-2222-2222-222222222222', '2025-04-10T10:30:00Z', '2025-04-10T10:30:00Z');

-- Marketing Campaign project tasks
INSERT INTO public.tasks (id, title, description, completed, starred, project_id, created_at, updated_at)
VALUES
  ('cccccccc-0003-0003-0003-000000000001', 'Campaign strategy', 'Define marketing objectives and approach', true, true, '33333333-3333-3333-3333-333333333333', '2025-03-06T09:15:00Z', '2025-03-12T13:45:00Z'),
  ('cccccccc-0003-0003-0003-000000000002', 'Content planning', 'Create content calendar and themes', true, false, '33333333-3333-3333-3333-333333333333', '2025-03-13T11:30:00Z', '2025-03-18T16:00:00Z'),
  ('cccccccc-0003-0003-0003-000000000003', 'Design social media assets', 'Create graphics for campaign posts', true, true, '33333333-3333-3333-3333-333333333333', '2025-03-19T10:45:00Z', '2025-03-25T14:20:00Z'),
  ('cccccccc-0003-0003-0003-000000000004', 'Email template design', 'Create templates for campaign emails', true, false, '33333333-3333-3333-3333-333333333333', '2025-03-20T15:00:00Z', '2025-03-28T11:30:00Z'),
  ('cccccccc-0003-0003-0003-000000000005', 'Landing page creation', 'Build campaign landing page', true, false, '33333333-3333-3333-3333-333333333333', '2025-03-22T09:30:00Z', '2025-04-01T13:45:00Z'),
  ('cccccccc-0003-0003-0003-000000000006', 'PPC ad setup', 'Configure Google and social media ads', false, true, '33333333-3333-3333-3333-333333333333', '2025-04-02T14:15:00Z', '2025-04-02T14:15:00Z'),
  ('cccccccc-0003-0003-0003-000000000007', 'Influencer outreach', 'Contact and brief campaign influencers', false, true, '33333333-3333-3333-3333-333333333333', '2025-04-03T11:00:00Z', '2025-04-03T11:00:00Z'),
  ('cccccccc-0003-0003-0003-000000000008', 'Content scheduling', 'Schedule all campaign content', false, false, '33333333-3333-3333-3333-333333333333', '2025-04-05T10:30:00Z', '2025-04-05T10:30:00Z'),
  ('cccccccc-0003-0003-0003-000000000009', 'Campaign launch', 'Execute campaign launch activities', false, true, '33333333-3333-3333-3333-333333333333', '2025-04-12T09:00:00Z', '2025-04-12T09:00:00Z'),
  ('cccccccc-0003-0003-0003-000000000010', 'Performance monitoring', 'Track KPIs and campaign metrics', false, false, '33333333-3333-3333-3333-333333333333', '2025-04-13T14:00:00Z', '2025-04-13T14:00:00Z');

-- Database Migration project tasks
INSERT INTO public.tasks (id, title, description, completed, starred, project_id, created_at, updated_at)
VALUES
  ('dddddddd-0004-0004-0004-000000000001', 'Data audit', 'Review current database structure and content', true, true, '44444444-4444-4444-4444-444444444444', '2025-02-21T10:00:00Z', '2025-02-28T15:30:00Z'),
  ('dddddddd-0004-0004-0004-000000000002', 'Migration strategy', 'Define migration approach and timeline', true, true, '44444444-4444-4444-4444-444444444444', '2025-03-01T09:15:00Z', '2025-03-05T14:45:00Z'),
  ('dddddddd-0004-0004-0004-000000000003', 'Schema design', 'Design new database schema', true, false, '44444444-4444-4444-4444-444444444444', '2025-03-06T13:30:00Z', '2025-03-10T11:00:00Z'),
  ('dddddddd-0004-0004-0004-000000000004', 'Create migration scripts', 'Develop scripts to transfer data', true, false, '44444444-4444-4444-4444-444444444444', '2025-03-11T10:45:00Z', '2025-03-15T16:30:00Z'),
  ('dddddddd-0004-0004-0004-000000000005', 'Setup cloud infrastructure', 'Provision new database servers', false, true, '44444444-4444-4444-4444-444444444444', '2025-03-12T14:00:00Z', '2025-03-12T14:00:00Z'),
  ('dddddddd-0004-0004-0004-000000000006', 'Test migration process', 'Run migration in staging environment', false, true, '44444444-4444-4444-4444-444444444444', '2025-03-16T09:30:00Z', '2025-03-16T09:30:00Z'),
  ('dddddddd-0004-0004-0004-000000000007', 'Data verification', 'Verify migrated data for accuracy', false, false, '44444444-4444-4444-4444-444444444444', '2025-03-20T13:15:00Z', '2025-03-20T13:15:00Z'),
  ('dddddddd-0004-0004-0004-000000000008', 'Application testing', 'Test applications with new database', false, false, '44444444-4444-4444-4444-444444444444', '2025-03-25T11:45:00Z', '2025-03-25T11:45:00Z'),
  ('dddddddd-0004-0004-0004-000000000009', 'Production migration', 'Execute migration in production', false, true, '44444444-4444-4444-4444-444444444444', '2025-03-30T08:00:00Z', '2025-03-30T08:00:00Z'),
  ('dddddddd-0004-0004-0004-000000000010', 'Legacy system decommissioning', 'Shut down old database systems', false, false, '44444444-4444-4444-4444-444444444444', '2025-04-05T10:00:00Z', '2025-04-05T10:00:00Z');

-- Product Analytics project tasks
INSERT INTO public.tasks (id, title, description, completed, starred, project_id, created_at, updated_at)
VALUES
  ('eeeeeeee-0005-0005-0005-000000000001', 'Requirements gathering', 'Define analytics needs and objectives', true, true, '55555555-5555-5555-5555-555555555555', '2025-03-13T10:30:00Z', '2025-03-18T14:45:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000002', 'Analytics tool evaluation', 'Research and select analytics platform', true, false, '55555555-5555-5555-5555-555555555555', '2025-03-19T13:00:00Z', '2025-03-25T11:30:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000003', 'Event tracking planning', 'Define key events to track', true, true, '55555555-5555-5555-5555-555555555555', '2025-03-26T09:45:00Z', '2025-03-30T15:20:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000004', 'Implement basic tracking', 'Add core analytics tracking code', true, false, '55555555-5555-5555-5555-555555555555', '2025-03-31T14:15:00Z', '2025-04-05T10:30:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000005', 'Custom event implementation', 'Add tracking for specific user actions', true, false, '55555555-5555-5555-5555-555555555555', '2025-04-06T11:00:00Z', '2025-04-10T16:45:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000006', 'User funnel setup', 'Configure conversion funnels', false, true, '55555555-5555-5555-5555-555555555555', '2025-04-11T09:30:00Z', '2025-04-11T09:30:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000007', 'Dashboard creation', 'Build analytics dashboards', false, true, '55555555-5555-5555-5555-555555555555', '2025-04-12T13:45:00Z', '2025-04-12T13:45:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000008', 'Data validation', 'Verify accuracy of collected data', false, false, '55555555-5555-5555-5555-555555555555', '2025-04-14T10:15:00Z', '2025-04-14T10:15:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000009', 'Team training', 'Train team on using analytics tools', false, false, '55555555-5555-5555-5555-555555555555', '2025-04-16T15:00:00Z', '2025-04-16T15:00:00Z'),
  ('eeeeeeee-0005-0005-0005-000000000010', 'Ongoing analysis', 'Establish regular reporting schedule', false, true, '55555555-5555-5555-5555-555555555555', '2025-04-18T11:30:00Z', '2025-04-18T11:30:00Z');
