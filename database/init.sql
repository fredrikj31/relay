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

--- account table
CREATE TABLE IF NOT EXISTS account (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  password_salt varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

ALTER TABLE ONLY account ADD CONSTRAINT account_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY account ADD CONSTRAINT account_id_unique_key UNIQUE (id);
ALTER TABLE ONLY account ADD CONSTRAINT account_email_unique_key UNIQUE (email);
---

--- refresh token table
CREATE TABLE IF NOT EXISTS refresh_token (
  id uuid NOT NULL,
  account_id uuid NOT NULL,
  expires_at timestamp NOT NULL
);

ALTER TABLE ONLY refresh_token ADD CONSTRAINT refresh_token_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY refresh_token ADD CONSTRAINT refresh_token_id_unique_key UNIQUE (id);
ALTER TABLE ONLY refresh_token ADD CONSTRAINT refresh_token_account_id_references FOREIGN KEY(account_id) REFERENCES account(id);
---

--- contact table
CREATE TABLE IF NOT EXISTS contact (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  account_id uuid NOT NULL,
  contact_id uuid NOT NULL
);

ALTER TABLE ONLY contact ADD CONSTRAINT contact_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY contact ADD CONSTRAINT contact_account_id_references FOREIGN KEY(account_id) REFERENCES account(id);
ALTER TABLE ONLY contact ADD CONSTRAINT contact_contact_id_references FOREIGN KEY(contact_id) REFERENCES account(id);

CREATE INDEX contact_account_id_index ON contact(account_id);
---

--- contact_request table
CREATE TABLE IF NOT EXISTS contact_request (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  sender_account_id uuid NOT NULL,
  receiver_account_id uuid NOT NULL,
  status contact_request_status NOT NULL
);
ALTER TABLE ONLY contact_request ADD CONSTRAINT contact_request_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY contact_request ADD CONSTRAINT contact_request_sender_account_id_references FOREIGN KEY(sender_account_id) REFERENCES account(id);
ALTER TABLE ONLY contact_request ADD CONSTRAINT contact_request_receiver_account_id_references FOREIGN KEY(receiver_account_id) REFERENCES account(id);

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
  owner_account_id uuid      -- NULL for DIRECT rooms, set for GROUP (the creator/admin)
);

ALTER TABLE ONLY room ADD CONSTRAINT room_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY room ADD CONSTRAINT room_id_unique_key UNIQUE (id);
ALTER TABLE ONLY room ADD CONSTRAINT room_owner_account_id_references FOREIGN KEY(owner_account_id) REFERENCES account(id);
---

--- room_member table
CREATE TABLE IF NOT EXISTS room_member (
  id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  room_id uuid NOT NULL,
  account_id uuid NOT NULL
);

ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_room_id_references FOREIGN KEY(room_id) REFERENCES room(id);
ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_account_id_references FOREIGN KEY(account_id) REFERENCES account(id);
ALTER TABLE ONLY room_member ADD CONSTRAINT room_member_unique_membership UNIQUE (room_id, account_id);

CREATE INDEX room_member_room_id_index ON room_member(room_id);
CREATE INDEX room_member_account_id_index ON room_member(account_id);
---