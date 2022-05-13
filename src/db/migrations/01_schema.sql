DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS location CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS conversation CASCADE;
DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE user (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
);

CREATE location (
  id SERIAL PRIMARY KEY NOT NULL,
  lng NUMERIC NOT NULL,
  lat NUMERIC NOT NULL,
);

CREATE profile (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  pet_name VARCHAR(255) NOT NULL,
  size VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  species VARCHAR(255) NOT NULL,
  age VARCHAR(255) NOT NULL,
  picture URL
);

CREATE conversation (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  chat_id  INTEGER REFERENCES chat(id) ON DELETE CASCADE,
);

CREATE chat (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT NOT NULL,
  message_date TIMESTAMP NOT NULL DEFAULT NOW
);





















