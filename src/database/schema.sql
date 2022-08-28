CREATE DATABASE "crud-users";

-- Habilitando uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  cpf VARCHAR,
  genre VARCHAR,
  birthDate VARCHAR
);
