-- TopRidge Partner Network — Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Partner Applications
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  brokerage_name TEXT NOT NULL,
  broker_name TEXT NOT NULL,
  broker_email TEXT NOT NULL,
  license_number TEXT NOT NULL,
  service_area TEXT NOT NULL,
  social_links TEXT,
  monthly_volume TEXT,
  common_services TEXT,
  client_resource_only BOOLEAN,
  interested_in_compensation TEXT,
  compensation_acknowledged BOOLEAN DEFAULT false,
  client_permission_acknowledged BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  broker_approval_status TEXT DEFAULT 'not_required',
  payout_eligible BOOLEAN DEFAULT false,
  partner_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vendor Applications
CREATE TABLE vendor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  service_category TEXT NOT NULL,
  service_area TEXT NOT NULL,
  google_business_profile TEXT,
  review_rating TEXT,
  licensed_insured TEXT,
  response_time TEXT,
  trust_reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Client Requests
CREATE TABLE client_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_name TEXT,
  partner_email TEXT NOT NULL,
  partner_code TEXT NOT NULL,
  brokerage_name TEXT,
  license_number TEXT,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_permission BOOLEAN NOT NULL DEFAULT false,
  transaction_type TEXT,
  service_needed TEXT[], -- array of service types
  property_city TEXT,
  property_zip TEXT,
  moving_from TEXT,
  moving_to TEXT,
  expected_closing_date DATE,
  expected_move_date DATE,
  urgency TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new_submission',
  assigned_vendor TEXT,
  broker_approval_status TEXT,
  payout_eligible BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public forms)
CREATE POLICY "Allow anonymous inserts on partner_applications"
  ON partner_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on vendor_applications"
  ON vendor_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on client_requests"
  ON client_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin can read all (use service_role key or authenticated admin)
CREATE POLICY "Admin read all partner_applications"
  ON partner_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin read all vendor_applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin read all client_requests"
  ON client_requests FOR SELECT
  TO authenticated
  USING (true);
