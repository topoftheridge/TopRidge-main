-- TopRidge Partner Network Database Schema
-- PostgreSQL syntax (compatible with Supabase, Neon, etc.)

-- ============================================
-- 1. Partner Applications (Real Estate Professionals)
-- ============================================
CREATE TABLE partner_applications (
  id              SERIAL PRIMARY KEY,
  full_name       VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  phone           VARCHAR(50) NOT NULL,
  brokerage       VARCHAR(255) NOT NULL,
  broker_name     VARCHAR(255) NOT NULL,
  broker_email    VARCHAR(255) NOT NULL,
  license_number  VARCHAR(100) NOT NULL,
  service_area    VARCHAR(500) NOT NULL,
  social          VARCHAR(500),
  monthly_volume  VARCHAR(255) NOT NULL,
  common_services TEXT NOT NULL,
  free_resource   VARCHAR(20) NOT NULL,          -- 'yes', 'no', 'unsure'
  compensation_interest VARCHAR(20) NOT NULL,    -- 'yes', 'no', 'unsure'
  ack_compensation BOOLEAN NOT NULL DEFAULT FALSE,
  ack_permission   BOOLEAN NOT NULL DEFAULT FALSE,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending',  -- 'pending', 'approved', 'denied', 'revoked'
  partner_id      VARCHAR(50) UNIQUE,            -- Assigned on approval, e.g. 'TR-12345'
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  reviewed_at     TIMESTAMP,
  notes           TEXT
);

CREATE INDEX idx_partner_applications_email ON partner_applications(email);
CREATE INDEX idx_partner_applications_status ON partner_applications(status);

-- ============================================
-- 2. Vendor Applications (Home Service Providers)
-- ============================================
CREATE TABLE vendor_applications (
  id              SERIAL PRIMARY KEY,
  company_name    VARCHAR(255) NOT NULL,
  contact_name    VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  phone           VARCHAR(50) NOT NULL,
  website         VARCHAR(500),
  service_category VARCHAR(50) NOT NULL,         -- 'moving', 'packing', 'junk_removal', 'cleaning', 'painting', 'flooring', 'locksmith', 'landscaping', 'pool', 'other'
  service_area    VARCHAR(500) NOT NULL,
  google_profile  VARCHAR(500),
  reviews         VARCHAR(255),
  licensed_insured VARCHAR(20) NOT NULL,         -- 'yes', 'partial', 'no'
  response_time   VARCHAR(255) NOT NULL,
  trust_reason    TEXT NOT NULL,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending',  -- 'pending', 'approved', 'denied', 'revoked'
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  reviewed_at     TIMESTAMP,
  notes           TEXT
);

CREATE INDEX idx_vendor_applications_email ON vendor_applications(email);
CREATE INDEX idx_vendor_applications_status ON vendor_applications(status);
CREATE INDEX idx_vendor_applications_category ON vendor_applications(service_category);

-- ============================================
-- 3. Client Requests (Submitted by Approved Partners)
-- ============================================
CREATE TABLE client_requests (
  id                  SERIAL PRIMARY KEY,
  -- Partner info
  partner_name        VARCHAR(255) NOT NULL,
  partner_email       VARCHAR(255) NOT NULL,
  partner_id          VARCHAR(50) NOT NULL,
  brokerage           VARCHAR(255) NOT NULL,
  license_number      VARCHAR(100) NOT NULL,
  -- Client info
  client_name         VARCHAR(255) NOT NULL,
  client_phone        VARCHAR(50) NOT NULL,
  client_email        VARCHAR(255),
  client_permission   BOOLEAN NOT NULL DEFAULT TRUE,
  -- Transaction
  transaction_type    VARCHAR(20) NOT NULL,      -- 'buyer', 'seller', 'landlord', 'tenant', 'investor', 'other'
  -- Services (stored as comma-separated or JSON array)
  services_needed     TEXT NOT NULL,             -- e.g. 'moving,cleaning,locksmith'
  -- Project details
  property_city       VARCHAR(255) NOT NULL,
  property_zip        VARCHAR(20) NOT NULL,
  moving_from         VARCHAR(500),
  moving_to           VARCHAR(500),
  closing_date        DATE,
  move_date           DATE,
  urgency             VARCHAR(20) NOT NULL,      -- 'asap', 'this_week', 'next_week', 'two_weeks', 'flexible'
  notes               TEXT,
  -- Consent
  consent_permission  BOOLEAN NOT NULL DEFAULT FALSE,
  consent_disclosure  BOOLEAN NOT NULL DEFAULT FALSE,
  consent_terms       BOOLEAN NOT NULL DEFAULT FALSE,
  -- Status tracking
  status              VARCHAR(30) NOT NULL DEFAULT 'received',  -- 'received', 'reviewing', 'vendor_assigned', 'in_progress', 'completed', 'cancelled'
  assigned_vendor_id  INTEGER REFERENCES vendor_applications(id),
  created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMP NOT NULL DEFAULT NOW(),
  reviewed_at         TIMESTAMP,
  admin_notes         TEXT
);

CREATE INDEX idx_client_requests_partner ON client_requests(partner_id);
CREATE INDEX idx_client_requests_status ON client_requests(status);
CREATE INDEX idx_client_requests_created ON client_requests(created_at);
