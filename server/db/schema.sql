DROP DATABASE IF EXISTS ratings;

CREATE DATABASE ratings;

USE ratings;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(500),
  body VARCHAR(1000),
  recommended BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(100),
  response VARCHAR(500),
  helpfulness INT
);

COPY reviews
FROM '/Users/kyle/Desktop/sdcdata/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url VARCHAR(500),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
)

COPY photos
FROM '/Users/kyle/Desktop/sdcdata/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(50)
)

COPY characteristics
FROM '/Users/kyle/Desktop/sdcdata/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE reviewcharacteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
)

COPY reviewcharacteristics
FROM '/Users/kyle/Desktop/sdcdata/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

module.exports = ratings;