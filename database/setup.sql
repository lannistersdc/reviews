CREATE TABLE reviews
(
  id serial,
  restaurantID INTEGER,
  username VARCHAR(50),
  location VARCHAR(50),
  vip BOOLEAN,
  totalReviews SMALLINT,
  overall SMALLINT,
  food SMALLINT,
  service SMALLINT,
  ambience SMALLINT,
  value SMALLINT,
  recommend BOOLEAN,
  date VARCHAR(100),
  text VARCHAR(255)
);

COPY reviews from '/Users/adamreback/Documents/Hack/SDC/reviews/seed.csv' delimiter ',' csv header;
