require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const getReviews = async (req, res) => {
  const id = req.query.id;
  const page = req.query.page || 1;
  const sort = req.query.sort;
  const count = req.query.count || 5;
  const offset = (page - 1) * count;

  try {
    const text = 'SELECT reviews.*, array_agg(reviewPhotos.img_url) as photos FROM reviews LEFT JOIN reviewPhotos ON reviews.id = reviewPhotos.review_id WHERE reviews.product_id = $1 GROUP BY reviews.id LIMIT $2 OFFSET $3';
    const values = [id, count, offset];
    const result = await pool.query(text, values);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getReviewByText = async (req, res) => {
  const id = req.query.id;
  const page = req.query.page || 1;
  const sort = req.query.sort;
  const count = req.query.count || 5;
  const offset = (page - 1) * count;

  try {
    const { text } = req.params;
    const query = 'SELECT reviews.*, array_agg(reviewPhotos.img_url) as reviewPhotos FROM reviews LEFT JOIN reviewPhotos ON reviews.id = reviewPhotos.review_id WHERE (reviews.product_id = $1) AND (body LIKE $2) GROUP BY reviews.id LIMIT $3 OFFSET $4';
    const values = [id, `%${text}%`, count, offset];
    const result = await pool.query(query, values);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

//EXPLAIN ANALYSE INSERT INTO reviews (product_id, rating, created_date, summary, body, recommend, reviewer_name, reviewer_email) VALUES (900000, 5, 1694297930260, 'I liked the product', 'I REALLY REALLY REALLY liked the product', true, 'John Doe', 'firstname@lastname.com') RETURNING id

const addReview = async (req, res) => {
  try {
    const {
      productId, rating, summary, body, recommend, name, email, photos, characteristics,
    } = req.body;
    const values = [productId, rating, Date.now(), summary, body, recommend, name, email];
    const result = await pool.query('INSERT INTO reviews (product_id, rating, created_date, summary, body, recommend, reviewer_name, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', values);
    const reviewId = result.rows[0].id;
    // Insert photos to reviewPhotos table
    if (photos.length > 0) {
      photos.forEach((img) => pool.query('INSERT INTO reviewPhotos (review_id, img_url) VALUES ($1, $2)', [reviewId, img]));
    }

    // Look up the characteristic IDs for the product ID
    const charLookup = await pool.query('SELECT id FROM characteristics WHERE product_id = $1', [productId]);
    const charIds = charLookup.rows;
    // Insert characteristics to charReviews table
    if (charIds.length > 0) {
      charIds.forEach((char, i) => pool.query('INSERT INTO charreviews (char_id, review_id, review_value) VALUES ($1, $2, $3)', [char.id, reviewId,
        characteristics[i]]));
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

const rateHelpful = async (req, res) => {
  try {
    const reviewId = req.params.id;
    await pool.query('UPDATE reviews SET helpful = helpful + 1 WHERE id = $1', [reviewId]);
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getReviews,
  getReviewByText,
  addReview,
  rateHelpful,
};
