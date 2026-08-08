--- contact request status enum
CREATE TYPE contact_request_status AS ENUM (
  'PENDING',
  'ACCEPTED',
  'DECLINED'
);

--- room type enum
CREATE TYPE room_type AS ENUM (
  'DIRECT',
  'GROUP'
);

--- contact table
CREATE TABLE IF NOT EXISTS contact (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  account_id text NOT NULL,
  contact_id text NOT NULL
);

ALTER TABLE ONLY contact ADD CONSTRAINT contact_id_primary_key PRIMARY KEY (id);

CREATE INDEX contact_account_id_index ON contact(account_id);
---

--- contact_request table
CREATE TABLE IF NOT EXISTS contact_request (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  sender_account_id text NOT NULL,
  receiver_account_id text NOT NULL,
  status contact_request_status NOT NULL
);
ALTER TABLE ONLY contact_request ADD CONSTRAINT contact_request_id_primary_key PRIMARY KEY (id);

CREATE INDEX contact_request_sender_account_id_index ON contact_request(sender_account_id);
CREATE INDEX contact_request_receiver_account_id_index ON contact_request(receiver_account_id);
---

--- room table
CREATE TABLE IF NOT EXISTS room (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  type room_type NOT NULL,
  name varchar(255),         -- NULL for DIRECT rooms, required for GROUP
  owner_account_id text      -- NULL for DIRECT rooms, set for GROUP (the creator/admin)
);

ALTER TABLE ONLY room ADD CONSTRAINT room_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY room ADD CONSTRAINT room_id_unique_key UNIQUE (id);
---

--- room_member table
CREATE TABLE IF NOT EXISTS room_member (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  room_id uuid NOT NULL,
  account_id text NOT NULL
);

ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_room_id_references FOREIGN KEY(room_id) REFERENCES room(id);
ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_unique_membership UNIQUE (room_id, account_id);

CREATE INDEX room_member_room_id_index ON room_member(room_id);
CREATE INDEX room_member_account_id_index ON room_member(account_id);
---