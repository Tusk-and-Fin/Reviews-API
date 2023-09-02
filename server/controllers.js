require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
});

const getReviews = async (req, res) => {
  try {
    const text = 'SELECT reviews.*, array_agg(reviewPhotos.img_url) as reviewPhotos FROM reviews LEFT JOIN reviewPhotos ON reviews.id = reviewPhotos.review_id GROUP BY reviews.id LIMIT 1';
    // const result = await pool.query('SELECT * FROM reviews ORDER BY id LIMIT 100');
    const result = await pool.query(text);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getReviewByText = async (req, res) => {
  try {
    const text = req.params.text;
    const result = await pool.query('SELECT * FROM reviews WHERE body LIKE $1 ORDER BY id LIMIT 100', [text]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const addReview = async (req, res) => {
  try {
    const {
      productId, rating, summary, body, recommend, name, email,
    } = req.body;
    const values = [productId, rating, Date.now(), summary, body, recommend, name, email];
    await pool.query('INSERT INTO reviews (product_id, rating, created_date, summary, body, recommend, reviewer_name, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', values);
    res.sendStatus(201);
  } catch (error) {
    console.log(error.messsage);
  }
};

const rateHelpful = async (req, res) => {
  try {
    const reviewId = req.params.id;
    await pool.query('UPDATE reviews SET helpful = helpful + 1 WHERE id = $1', reviewId);
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
