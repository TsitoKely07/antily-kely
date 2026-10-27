-- PostgreSQL Database Schema

-- Généré automatiquement



-- Extension pour UUID

CREATE EXTENSION IF NOT EXISTS "pgcrypto";



CREATE TABLE member (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  firstname VARCHAR(255),
  date_of_birth DATE,
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE territory_level (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level INTEGER,
  name VARCHAR(255)
);

CREATE TABLE territory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  number INTEGER,
  territory_dependance_id UUID,
  territory_level_id UUID,
  CONSTRAINT "fk_territory_territory_dependance_id" FOREIGN KEY (territory_dependance_id) REFERENCES territory(id) ON DELETE CASCADE,
  CONSTRAINT "fk_territory_territory_level" FOREIGN KEY (territory_level_id) REFERENCES territory_level(id) ON DELETE CASCADE
);

CREATE TABLE membership_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(255)
);

CREATE TABLE branch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255)
);

CREATE TABLE role (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  territory_level_id UUID,
  branch_id UUID,
  is_youth BOOLEAN,
  label VARCHAR(255),
  CONSTRAINT "fk_role_territory_level" FOREIGN KEY (territory_level_id) REFERENCES territory_level(id) ON DELETE CASCADE,
  CONSTRAINT "fk_role_branch" FOREIGN KEY (branch_id) REFERENCES branch(id) ON DELETE CASCADE
);

CREATE TABLE membership_fee (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_year_id UUID,
  fee NUMERIC(10,2),
  role_id UUID,
  CONSTRAINT "fk_membership_fee_membership_year" FOREIGN KEY (membership_year_id) REFERENCES membership_year(id) ON DELETE CASCADE,
  CONSTRAINT "fk_membership_fee_role" FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE membership_payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  amount NUMERIC(10,2),
  status INTEGER
);

CREATE TABLE membership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  territory_id UUID NOT NULL,
  member_id UUID,
  role_detail VARCHAR(255),
  status INTEGER NOT NULL,
  membership_fee_id UUID,
  membership_payment_id UUID,
  CONSTRAINT "fk_membership_territory" FOREIGN KEY (territory_id) REFERENCES territory(id) ON DELETE CASCADE,
  CONSTRAINT "fk_membership_member" FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE,
  CONSTRAINT "fk_membership_membership_fee" FOREIGN KEY (membership_fee_id) REFERENCES membership_fee(id) ON DELETE CASCADE,
  CONSTRAINT "fk_membership_membership_payment" FOREIGN KEY (membership_payment_id) REFERENCES membership_payment(id) ON DELETE CASCADE
);



-- Index suggérés pour les clés étrangères

CREATE INDEX IF NOT EXISTS "idx_territory_territory_dependance_id" ON territory(territory_dependance_id);

CREATE INDEX IF NOT EXISTS "idx_membership_territory_id" ON membership(territory_id);

CREATE INDEX IF NOT EXISTS "idx_territory_territory_level_id" ON territory(territory_level_id);

CREATE INDEX IF NOT EXISTS "idx_membership_member_id" ON membership(member_id);

CREATE INDEX IF NOT EXISTS "idx_membership_fee_membership_year_id" ON membership_fee(membership_year_id);

CREATE INDEX IF NOT EXISTS "idx_role_territory_level_id" ON role(territory_level_id);

CREATE INDEX IF NOT EXISTS "idx_role_branch_id" ON role(branch_id);

CREATE INDEX IF NOT EXISTS "idx_membership_fee_role_id" ON membership_fee(role_id);

CREATE INDEX IF NOT EXISTS "idx_membership_membership_fee_id" ON membership(membership_fee_id);

CREATE INDEX IF NOT EXISTS "idx_membership_membership_payment_id" ON membership(membership_payment_id);