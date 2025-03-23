-- Create medical_records table
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  provider TEXT NOT NULL,
  type TEXT NOT NULL,
  thumbnail_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Create policy for all users to view all records
DROP POLICY IF EXISTS "Public access" ON medical_records;
CREATE POLICY "Public access"
ON medical_records FOR SELECT
USING (true);

-- Insert sample data
INSERT INTO medical_records (title, date, provider, type, thumbnail_url, notes)
VALUES 
('Annual Physical', '2023-05-15', 'Dr. Smith', 'Examination', 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&q=80', 'Regular annual checkup. Blood pressure normal. Cholesterol slightly elevated.'),
('Blood Test Results', '2023-04-22', 'City Lab', 'Lab Results', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&q=80', 'Complete blood count and metabolic panel. All values within normal range.'),
('X-Ray Report', '2023-03-10', 'Imaging Center', 'Radiology', 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&q=80', 'Chest X-ray for persistent cough. No abnormalities detected.'),
('Specialist Consultation', '2023-02-05', 'Dr. Johnson', 'Consultation', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=300&q=80', 'Cardiology consultation for heart palpitations. ECG normal.'),
('Allergy Test', '2023-01-18', 'Allergy Clinic', 'Test', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80', 'Tested for common allergens. Positive for pollen and dust mites.'),
('MRI Scan', '2022-12-05', 'Advanced Imaging', 'Radiology', 'https://images.unsplash.com/photo-1516069677018-378971e2d685?w=300&q=80', 'Brain MRI for recurring headaches. No structural abnormalities found.');

-- Enable realtime
alter publication supabase_realtime add table medical_records;