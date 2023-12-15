DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS artists;

--CREATE INDEX concerts_concert_id_idx ON concerts (id);

CREATE TABLE artists (
  uri TEXT,
  display_name TEXT,
  artist_id SERIAL PRIMARY KEY
);

CREATE TABLE concerts (
  concert_id SERIAL PRIMARY KEY,
  artist_id SERIAL,
  type TEXT,
  uri TEXT,
  display_name TEXT,
  status TEXT,
  popularity double precision,
  datetime TEXT,
  city TEXT,
  lng double precision,
  lat double precision,
   CONSTRAINT fk_artist
      FOREIGN KEY(artist_id)
    REFERENCES artists(artist_id)
);
