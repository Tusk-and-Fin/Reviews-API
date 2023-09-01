DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  created_date BIGINT,
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR(1000),
  helpfulness INTEGER
);

DROP TABLE IF EXISTS reviewPhotos CASCADE;
CREATE TABLE reviewPhotos(
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  img_url TEXT,

  CONSTRAINT fk_review_id
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
);

DROP TABLE IF EXISTS characteristics CASCADE;
CREATE TABLE characteristics(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  char_name VARCHAR(50)
);

DROP TABLE IF EXISTS charReviews CASCADE;
CREATE TABLE charReviews(
  id SERIAL PRIMARY KEY,
  char_id INTEGER,
  review_id INTEGER,
  review_value INTEGER,

    CONSTRAINT fk_review_id
      FOREIGN KEY(review_id)
        REFERENCES reviews(id),

    CONSTRAINT fk_char_id
      FOREIGN KEY(char_id)
        REFERENCES characteristics(id)
);

DROP TABLE IF EXISTS totalRatings CASCADE;
CREATE TABLE totalRatings(
  id SERIAL PRIMARY KEY,
  one INTEGER,
  two INTEGER,
  three INTEGER,
  four INTEGER,
  five INTEGER
);


-- -- load csv files into DB

COPY reviews
FROM '/Users/patrickalexandre/Desktop/Hack Reactor Main Course/SDC/Reviews-API/data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviewphotos
FROM '/Users/patrickalexandre/Desktop/Hack Reactor Main Course/SDC/Reviews-API/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

-- COPY characteristics
-- FROM '/Users/patrickalexandre/Desktop/Hack Reactor Main Course/SDC/Reviews-API/data/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY charReviews
-- FROM '/Users/patrickalexandre/Desktop/Hack Reactor Main Course/SDC/Reviews-API/data/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;