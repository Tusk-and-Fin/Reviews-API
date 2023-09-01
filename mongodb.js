import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product_id: Number,
  rating: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  report: String,
  reviewer_name: String,
  helpfulness: Number,
  response: String,
  created_date: { type: Date, default: Date.now },
});

const productSchema = new Schema({
  product_name: String,
})

const photoSchema = new Schema({
  review_id: Number,
  img_url: String,
})

const charSchema = new Schema({
  product_id: Number,
  name: String,
})

const charReviewsSchema = new Schema({
  char_id: Number,
  review_id: Number,
  value: Number,
})