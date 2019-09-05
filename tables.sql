CREATE DATABASE realestate;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(100),
  password VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INT,
  type VARCHAR(50),
  price INT,
  size FLOAT,
  bedrooms INT,
  bathrooms INT,
  description VARCHAR,
  built INT,
  sold BOOLEAN DEFAULT false,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE property_images (
  id SERIAL PRIMARY KEY,
  property_id INT,
  img_ref VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE property_addresses (
  property_id INT,
  street VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code INT,
  country VARCHAR(100),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);